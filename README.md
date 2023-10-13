# Classting dev task

## 개요

학교 소식 뉴스피드를 위한 서버

## Document

Todo

## Usage

Todo

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
