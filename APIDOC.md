# EXPRESS BOILERPLATE API SERVER

기본 타임존 설정은 `KST` 타임입니다.

시간 및 날짜에 관련된 파라미터들은 끝에 `createdAt` 과 같은 형식으로 `~At` 이 접두어로 붙게됩니다.

## 클라이언트 통신시 유의 사항

모든 API 액세스는 `OAuth 2.0` 기반으로 되어 있습니다.

OAuth 인증을 통하여 `AccessToken`을 반드시 발급받아야 합니다.

그리고 발급 받은 `AccessToken`은 매 요청시 헤더에 포함되어야 합니다.

`AccessToken`은 `Bearer`가 접두사로 붙은 `Bearer a1s2d3f4f5g6h7` 꼴이 되어야 합니다.
