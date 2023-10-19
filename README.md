# Classting dev task

## 개요

학교 소식 뉴스피드를 위한 서버

## API Document

Swagger OAS 3.0
Path to /api-docs after server startup

## Usage

```bash
# clone repository
$ git clone https://github.com/rrgks6221/classting-dev-task

# change directory
$ cd classting-dev-task/

# dependency install
$ npm i

# create environment variables file
# 파일 생성 후 메일 본문에 있는 환경변수 붙여넣기
$ touch .env

# source code build
$ npm run build

# server starting
# swagger url localhost:port/api-docs
# ex) localhost:3000/api-docs
$ npm run start:prod
```

### Scripts

```bash
# watch mode server starting
$ npm run start:dev

# debug mode server starting
$ npm run start:debug

# build
$ npm run build

# server string
$ npm run start:prod

# test
$ npm run test
```

## Directory Structure

```bash
.
├── src
│   ├── apis # api 가 존재하거나 생성될 수 있는 module directory
│   │   ├── auth # auth module
│   │   │   ├── auth.module.ts
│   │   │   ├── controllers # auth controller directory
│   │   │   ├── decorators # auth decorator directory
│   │   │   ├── dto # auth dto directory
│   │   │   ├── guards # auth guard directory
│   │   │   ├── jwt # auth jwt directory
│   │   │   └── services # auth service directory
│   │   ├── school-pages # schoolPages module
│   │   │   ├── school-pages.module.ts
│   │   │   ├── constants # schoolPage constant directory
│   │   │   ├── controllers # schoolPage controller directory
│   │   │   ├── dto # schoolPage dto directory
│   │   │   ├── entities # schoolPage entity directory
│   │   │   └── services # schoolPage service directory
│   │   └── students
│   │       ├── students.module.ts
│   │       ├── dto # student dto directory
│   │       ├── entities # student entity directory
│   │       └── services # student service directory
│   ├── common # common directory
│   │   ├── dto # common dto directory
│   │   ├── pipes # common pipe directory
│   │   └── transformers # common transformer directory
│   ├── config # config directory
│   │   ├── app-config # env management directory
│   │   └── external-config # external resource config directory
│   ├── constants # common constant directory
│   ├── app.module.ts # app module file
│   └── main.ts # main file
├── test # test directory
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
│   └── mock # mock directory
│       ├── mock.common.ts # common mock file
│       ├── mock.repository.ts # repository mock file
│       ├── mock.service.ts # service mock file
│       └── mock.type.ts # mock type file
├── tsconfig.build.json # ts build config file
└── tsconfig.json # ts config file
```

## Branch Strategy

1. 먼저 이슈를 생성한다.
   1. 생성된 이슈번호와 branch type을 통해 브랜치를 생성한다.
      - {branch-type}/i{issue-number}/{branch-title}
        ex) `doc/i1/readme`
1. 작업이 완료되면 작업 브랜치에 푸시 후 `main` 브랜치에 PR 을 요청한다.

| Icon                                                      | Label    | Description                          |
| --------------------------------------------------------- | -------- | ------------------------------------ |
| <img src="https://img.shields.io/badge/bugfix-F7DE00"/>   | config   | 설정 관련 작업                       |
| <img src="https://img.shields.io/badge/bugfix-CC3D10"/>   | bugfix   | 버그 수정                            |
| <img src="https://img.shields.io/badge/delete-8B97E4"/>   | delete   | 코드 삭제                            |
| <img src="https://img.shields.io/badge/doc-F3D197"/>      | doc      | 문서 작업                            |
| <img src="https://img.shields.io/badge/feat-331AE4"/>     | feat     | 새로운 기능 추가                     |
| <img src="https://img.shields.io/badge/modify-2AC582"/>   | modify   | 코드 수정(기능상의 수정이 있는 경우) |
| <img src="https://img.shields.io/badge/refactor-A9362A"/> | refactor | 코드 수정(기능상의 수정이 없는 경우) |
| <img src="https://img.shields.io/badge/test-EAEA38"/>     | test     | 테스트코드 관련 작업                 |

## Commit Strategy

1. 작업 브랜치의 이슈번호와 commit type 을 통해 커밋메시지를 작성한다.
   - [#{issue-number}]/{commit-type}: {commit description}
     ex) [#1]/doc: README.md

| type     | Description                          |
| -------- | ------------------------------------ |
| config   | 설정 관련 작업                       |
| bugfix   | 버그 수정                            |
| delete   | 코드 삭제                            |
| doc      | 문서 작업                            |
| feat     | 새로운 기능 추가                     |
| modify   | 코드 수정(기능상의 수정이 있는 경우) |
| refactor | 코드 수정(기능상의 수정이 없는 경우) |
| test     | 테스트코드 관련 작업                 |
