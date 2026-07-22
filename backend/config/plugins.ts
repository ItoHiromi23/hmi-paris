import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedExecutableTypes = [
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

const uploadSecurity = {
  allowedTypes: allowedMediaTypes,
  deniedTypes: deniedExecutableTypes,
};

/**
 * Prefer S3-compatible storage (AWS S3, Cloudflare R2, etc.) when credentials
 * are present so Media Library files survive Railway redeploys.
 * Falls back to local `public/uploads` for local development.
 */
function uploadPluginConfig(env: Core.Config.Shared.ConfigParams['env']) {
  const bucket = env('AWS_BUCKET', '') || env('R2_BUCKET', '');
  const accessKeyId = env('AWS_ACCESS_KEY_ID', '') || env('R2_ACCESS_KEY_ID', '');
  const secretAccessKey =
    env('AWS_ACCESS_SECRET', '') ||
    env('AWS_SECRET_ACCESS_KEY', '') ||
    env('R2_ACCESS_SECRET', '');
  const endpoint = env('AWS_ENDPOINT', '') || env('R2_ENDPOINT', '');
  const baseUrl = env('CDN_URL', '') || env('R2_PUBLIC_URL', '');
  const rootPath = env('CDN_ROOT_PATH', '');
  const isR2 = Boolean(endpoint && endpoint.includes('r2.cloudflarestorage.com'));
  const region = env('AWS_REGION', endpoint ? 'auto' : 'us-east-1');
  const forcePathStyle = env.bool('AWS_S3_FORCE_PATH_STYLE', false);
  const omitAcl = env.bool('AWS_S3_OMIT_ACL', isR2);

  if (bucket && accessKeyId && secretAccessKey) {
    const params: Record<string, string | number> = { Bucket: bucket };
    if (!omitAcl) {
      params.ACL = env('AWS_ACL', 'public-read');
      params.signedUrlExpires = env.int('AWS_SIGNED_URL_EXPIRES', 15 * 60);
    }

    return {
      config: {
        provider: 'aws-s3',
        providerOptions: {
          ...(baseUrl ? { baseUrl } : {}),
          ...(rootPath ? { rootPath } : {}),
          s3Options: {
            credentials: {
              accessKeyId,
              secretAccessKey,
            },
            region,
            ...(endpoint ? { endpoint } : {}),
            ...(forcePathStyle ? { forcePathStyle: true } : {}),
            params,
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
        security: uploadSecurity,
      },
    };
  }

  return {
    config: {
      security: uploadSecurity,
    },
  };
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  'users-permissions': {
    config: {
      jwtManagement: 'refresh',
      sessions: {
        httpOnly: true,
      },
    },
  },
  upload: uploadPluginConfig(env),
});

export default config;
