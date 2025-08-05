#!/bin/bash

set -e

echo "📁 Generating project structure..."

echo "📌 Enter folder for the project (or use current directory with dot '.')"
read PROJECT_FOLDER
PROJECT_FOLDER=${PROJECT_FOLDER:-.}

if [ "$PROJECT_FOLDER" != "." ]; then
  echo "📂 Creating project folder..."
  mkdir -p "$PROJECT_FOLDER" || { echo "❌ Error creating folder"; exit 1; }
fi

cd "$PROJECT_FOLDER" || { echo "❌ Folder not found"; exit 1; }

echo "📝 Enter your project name:"
read PROJECT_NAME

if [ -z "$PROJECT_NAME" ]; then
  echo "❌ Project name not specified"
  exit 1
fi

echo "🔧 Choose a package manager [npm, pnpm, yarn]"

options=("npm" "yarn" "pnpm")
select opt in "${options[@]}"
do
  case $opt in
    "npm")
      echo "📦 Initializing project with npm..."
      npm init -y
      npm pkg set name="$PROJECT_NAME"
      PACKAGE_MANAGER="npm"
      break
      ;;
    "yarn")
      echo "📦 Initializing project with yarn..."
      yarn init -y
      PACKAGE_MANAGER="yarn"
      break
      ;;
    "pnpm")
      echo "📦 Initializing project with pnpm..."
      pnpm init
      pnpm pkg set name="$PROJECT_NAME"
      PACKAGE_MANAGER="pnpm"
      break
      ;;
    *)
      echo "❗ Invalid option: $REPLY"
      ;;
  esac
done

echo "📥 Installing development dependencies..."
INSTALL_DEPENDENCIES="esbuild loggerfy safe-json-stringify uuid zod"
INSTALL_DEV_DEPENDENCIES="ts-node typescript jest ts-jest @jest/globals @types/jest @types/node eslint eslint-plugin-format @antfu/eslint-config"

if [ "$PACKAGE_MANAGER" = "npm" ]; then
  npm install --save --save-exact $INSTALL_DEPENDENCIES
  npm install --save-dev --save-exact $INSTALL_DEV_DEPENDENCIES
elif [ "$PACKAGE_MANAGER" = "pnpm" ]; then
  pnpm add $INSTALL_DEPENDENCIES
  pnpm add -D $INSTALL_DEV_DEPENDENCIES
elif [ "$PACKAGE_MANAGER" = "yarn" ]; then
  yarn add $INSTALL_DEPENDENCIES
  yarn add -D $INSTALL_DEV_DEPENDENCIES
fi

echo "🛠️ Generating configuration files..."

echo "Adding tsconfig.ts"
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es2020",
    "strict": true,
    "preserveConstEnums": true,
    "noEmit": true,
    "sourceMap": false,
    "module": "es2015",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "experimentalDecorators": true,
    "baseUrl": "./",
    "paths": {
      "@domain/*": ["app/domain/*"],
      "@adapters/*": ["app/adapters/*"],
      "@lambda/*": ["app/entrypoints/lambda/*"],
      "@schemas/*": ["app/entrypoints/schemas/*"],
      "@libraries/*": ["app/libraries/*"],
      "@ports/*": ["app/domain/ports/*"],
      "@model/*": ["app/domain/model/*"]
    }
  },
  "exclude": ["node_modules"],
  "include": [
    "app/**/*.ts",
    "**/*.test.ts",
    "jest.config.ts",
    "eslint.config.mjs"
  ]
}
EOF

cat > tsconfig.spec.json << 'EOF'
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
  },
  "include": [
    "src/**/*.spec.ts",
    "src/**/*.d.ts"
  ]
}
EOF

cat > template.yaml << 'EOF'
Transform: AWS:Serverless-2016-10-31
Description: |
  Initial structure

Globals:
  Function:
    Timeout: 10
    Runtime: nodejs18.x
    Architectures:
      - x86_64
    Metadata:
      BuildMethod: esbuild
      BuildProperties:
        Minify: true
        Target: es2020
        Sourcemap: false

Resources:

Outputs:

Parameters:
EOF

cat > samconfig.toml << 'EOF'
# More information about the configuration file can be found here:
# https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html
version = 0.1

[default.global.parameters]
stack_name = "node-hexagonal-architecture-archetype"

[default.build.parameters]
cached = true
parallel = true

[default.validate.parameters]
lint = true

[default.deploy.parameters]
capabilities = "CAPABILITY_IAM"
confirm_changeset = true
resolve_s3 = true

[default.package.parameters]
resolve_s3 = true

[default.sync.parameters]
watch = true

[default.local_start_api.parameters]
warm_containers = "EAGER"

[default.local_start_lambda.parameters]
warm_containers = "EAGER"
EOF

cat > .editorconfig << 'EOF'
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
itabndent_style = space
indent_size = 4
insert_final_newline = true
trim_trailing_whitespace = true

# The indent size used in the `package.json` file cannot be changed
# https://github.com/npm/npm/pull/3180#issuecomment-16336516
[{*.yml,*.yaml,package.json}]
indent_style = space
indent_size = 2

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false
EOF

echo "📂 Creating folder structure for Clean Architecture..."
mkdir -p app app/adapters app/domain app/domain/builders app/entrypoints app/libraries events

cat > ./app/libraries/logger.ts << 'EOF'
import { Loggerfy } from 'loggerfy';

const logger = new Loggerfy();

export interface LOGGER_PARAMS {
  code: string;
  message: string;
  detail?: string;
  metadata?: Record<string, string>;
}

class LambdaLogger {
  static info({ code, message, metadata, detail }: LOGGER_PARAMS): void {
    logger
      .info()
      .setCode(code)
      .setDetail(detail ?? 'lambda_logger')
      .setMessage(message)
      .setMetadata(metadata ?? {})
      .write();
  }

  static warn({ code, message, metadata, detail }: LOGGER_PARAMS): void {
    logger
      .warn()
      .setCode(code)
      .setDetail(detail ?? 'lambda_logger')
      .setMessage(message)
      .setMetadata(metadata ?? {})
      .write();
  }

  static error({ code, message, metadata, detail }: LOGGER_PARAMS): void {
    logger
      .error()
      .setCode(code)
      .setDetail(detail ?? 'lambda_logger')
      .setMessage(message)
      .setMetadata(metadata ?? {})
      .write();
  }
}

export default LambdaLogger

EOF

cat > ./app/libraries/safe-object-stringify.ts << 'EOF'
import safeJsonStringify from 'safe-json-stringify'

export const safeStringify = (data: object) => {
  return safeJsonStringify(data, null, 2)
}

EOF

cat > ./app/domain/builders/api-response-builder.ts << 'EOF'
export interface LambdaApiResponse {
    statusCode: number;
    headers?: Record<string, string>;
    body?: string;
    cookies?: string[];
    isBase64Encoded?: boolean;
}

class LambdaResponseBuilder {
    private statusCode!: number;
    private headers?: Record<string, string>;
    private body?: string;
    private cookies?: string[];
    private isBase64Encoded?: boolean;

    constructor() {}

    static empty() {
        return new LambdaResponseBuilder();
    }

    withBody<T extends object>(body: T): LambdaResponseBuilder {
        this.body = JSON.stringify(body);

        return this;
    }

    withStatusCode(statusCode: number): LambdaResponseBuilder {
        this.statusCode = statusCode;
        return this;
    }

    withHeaders(headers: Record<string, string>): LambdaResponseBuilder {
        this.headers = { ...this.headers, ...headers };
        return this;
    }

    addCookie(cookie: string): LambdaResponseBuilder {
        if (this.cookies == null) {
            this.cookies = [];
        }
        this.cookies.push(cookie);
        return this;
    }

    setCookies(cookies: string[]): LambdaResponseBuilder {
        this.cookies = cookies;
        return this;
    }

    setBase64Encoding(isBase64Encoded: boolean): LambdaResponseBuilder {
        this.isBase64Encoded = isBase64Encoded;
        return this;
    }

    build(): LambdaApiResponse {
        return {
            statusCode: this.statusCode,
            headers: this.headers,
            body: this.body,
            cookies: this.cookies,
            isBase64Encoded: this.isBase64Encoded,
        };
    }
}

export default LambdaResponseBuilder;

EOF

cat > eslint.config.mjs << 'EOF'
// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
    typescript: true,
    formatters: true,
    stylistic: {
        semi: true,
        indent: 4,
        quotes: 'single',
    },
    rules: {
        'unicorn/filename-case': ['error', {
            case: 'kebabCase',
            ignore: ['README.md'],
        }],
    },
});
EOF

echo "📝 Configurando archivos"
cat > .gitignore << 'EOF'

# Created by https://www.toptal.com/developers/gitignore/api/osx,node,linux,windows,sam
# Edit at https://www.toptal.com/developers/gitignore?templates=osx,node,linux,windows,sam

### Linux ###
*~

# temporary files which can be created if a process still has a handle open of a deleted file
.fuse_hidden*

# KDE directory preferences
.directory

# Linux trash folder which might appear on any partition or disk
.Trash-*

# .nfs files are created when an open file is removed but is still being accessed
.nfs*

### Node ###
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Diagnostic reports (https://nodejs.org/api/report.html)
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage
*.lcov

# nyc test coverage
.nyc_output

# Grunt intermediate storage (https://gruntjs.com/creating-plugins#storing-task-files)
.grunt

# Bower dependency directory (https://bower.io/)
bower_components

# node-waf configuration
.lock-wscript

# Compiled binary addons (https://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional stylelint cache
.stylelintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env
.env.test
.env*.local

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt
dist

# Storybook build outputs
.out
.storybook-out
storybook-static

# rollup.js default build output
dist/

# Gatsby files
.cache/
# Comment in the public line in if your project uses Gatsby and not Next.js
# https://nextjs.org/blog/next-9-1#public-directory-support
# public

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Temporary folders
tmp/
temp/

### OSX ###
# General
.DS_Store
.AppleDouble
.LSOverride

# Icon must end with two \r
Icon


# Thumbnails
._*

# Files that might appear in the root of a volume
.DocumentRevisions-V100
.fseventsd
.Spotlight-V100
.TemporaryItems
.Trashes
.VolumeIcon.icns
.com.apple.timemachine.donotpresent

# Directories potentially created on remote AFP share
.AppleDB
.AppleDesktop
Network Trash Folder
Temporary Items
.apdisk

### SAM ###
# Ignore build directories for the AWS Serverless Application Model (SAM)
# Info: https://aws.amazon.com/serverless/sam/
# Docs: https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-reference.html

**/.aws-sam

### Windows ###
# Windows thumbnail cache files
Thumbs.db
Thumbs.db:encryptable
ehthumbs.db
ehthumbs_vista.db

# Dump file
*.stackdump

# Folder config file
[Dd]esktop.ini

# Recycle Bin used on file shares
$RECYCLE.BIN/

# Windows Installer files
*.cab
*.msi
*.msix
*.msm
*.msp

# Windows shortcuts
*.lnk

# Jetbrains products
.idea

# Envs
env.json

# End of https://www.toptal.com/developers/gitignore/api/osx,node,linux,windows,sam
EOF

cat > jest.config.ts << 'EOF'
/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
	preset: "ts-jest",
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	collectCoverageFrom: ["app/**/*.{js,jsx,ts,tsx}", "!<rootDir>/node_modules/"],
	testMatch: ["**/tests/unit/**/*.test.ts"],
	modulePathIgnorePatterns: [
		"src/domain/Builders/",
		"src/domain/exceptions/",
		"src/domain/model/",
		"src/domain/ports/",
		"src/libraries",
		"src/entrypoints/schemas",
	],
	moduleNameMapper: {
		"^@domain/(.*)$": "<rootDir>/src/domain/$1",
		"^@adapters/(.*)$": "<rootDir>/src/adapters/$1",
		"^@lambda/(.*)$": "<rootDir>/src/entrypoints/$1",
		"^@schemas/(.*)$": "<rootDir>/src/entrypoints/$1",
		"^@libraries/(.*)$": "<rootDir>/src/libraries/$1",
		"^@ports/(.*)$": "<rootDir>/src/domain/ports/$1",
		"^@model/(.*)$": "<rootDir>/src/domain/model/$1",
	},
};
EOF

# Final message
echo "✅ Project successfully created in '$PROJECT_FOLDER'"
echo "📛 Project Name: $PROJECT_NAME"
echo "📦 Package Manager: $PACKAGE_MANAGER"
echo "🎉 ESLint and development tools are configured."
echo "🚀 You're ready to start coding!"


