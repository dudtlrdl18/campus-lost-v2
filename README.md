# Campus Lost & Found (캠퍼스 분실물 찾기)

Node.js, Express, EJS, MySQL을 이용해 구현한 캠퍼스 분실물 등록·조회·삭제 웹 애플리케이션입니다.

## 배포 주소
- http://98.84.186.203:3000

## 기술 스택
- **Backend:** Node.js, Express, EJS
- **Database:** MySQL 8.4 (campus_lost / lost_items)
- **Infra:** AWS EC2 (Ubuntu), PM2

## 주요 기능
- 분실물 등록 (POST /items)
- 분실물 목록 조회 (GET /)
- 분실물 삭제 (POST /items/:id/delete)
