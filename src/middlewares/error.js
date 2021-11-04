export const ERROR_TABLE = {
  ValidationError: [400, '필드의 형식이 잘못되었습니다.', true],
  RequiredAccessToken: [400, '인증 토큰은 필수 입니다.', true],
  InvalidAccessToken: [400, '인증 토큰이 유효하지 않습니다.', true],
  InvalidAuthentication: [400, '인증 정보가 유효하지 않습니다.', true],

  NotEnableFileType: [400, '올바른 형식의 파일이 아닙니다.', true],

  LoginRequired: [401, '계속하려면 로그인하셔야 합니다.', true],
  PasswordInvalid: [401, '비밀번호가 틀렸습니다.', true],
  MobileInvalid: [401, '휴대전화 인증에 실패했습니다.', true],
  UserInvalid: [401, '비활성 혹은 탈퇴한 회원입니다.', true],

  AdminRequired: [403, '수정할 수 있는 권한이 없습니다.', true],
  ApproveRequired: [403, '관리자의 승인이 필요합니다.', true],
  PurchaseRequired: [403, '구매해야 합니다.', true],
  UserDisabled: [403, '비활성화된 사용자입니다.', true],
  MobileTimeout: [403, '휴대전화 인증 시간이 지났습니다.', true],
  MemberThreshold: [403, '정원을 초과했습니다.', true],
  MobileThrottle: [403, '잠시 후 다시 시도하세요.', true],
  Throttle: [403, '잠시 후 다시 시도하세요.', true],
  Forbidden: [403, '권한이 없습니다.', true],

  NotFound: [404, '지정된 객체를 찾을 수 없습니다.', true],
  UserNotFound: [404, '사용자를 찾을 수 없습니다.', true],

  UserConflict: [409, '이미 존재하는 유저입니다.'],
  MobileConflict: [409, '이미 해당 휴대전화 번호를 가진 사용자가 있습니다.', true],
  EmailConflict: [409, '이미 해당 이메일 주소를 가진 사용자가 있습니다.', true],
  NicknameConflict: [409, '이미 해당 닉네임을 가진 사용자가 있습니다.', true],
  IdentifierConflict: [409, '이미 존재하는 식별자 값 입니다.', false],
  Conflict: [409, '이미 처리되었습니다.', true],

  ServerError: [500, '서버에 내부 오류가 발생했습니다.', true],
  NotImplemented: [501, '서버에서 아직 구현되지 않았습니다.', true],
};

function truncateStripData(data) {
  let output = [];
  for (let key in data) {
    if (typeof data[key] === 'string') {
      if (key === 'password') {
        output.push(key + ': <REDACTED>');
        continue;
      }
      if (data[key].length > 200) output.push(key + ': ' + data[key].slice(0, 200) + '... total ' + data[key].length + 'chars');
      else output.push(key + ': ' + data[key]);
    }
  }
  return output.map((v) => '  ' + v).join('\n');
}

function failedFileHandler(value) {
  Object.keys(value).forEach((object) => {
    value[object].forEach((file) => {
      fs.unlink(file.path, (err) => {
        if (err) console.error(err);
      });
    });
  });
}

export default (error, req, res, next) => {
  const failedFileObject = req.files;
  if (failedFileObject && Object.keys(failedFileObject).length) failedFileHandler(failedFileObject);

  let errorName, errorData;
  if (typeof error === 'string') errorName = error;
  else if (error.name != null) errorName = error.name;

  if (errorName === 'SequelizeUniqueConstraintError') {
    if (error.fields[0] === 'email' || error.fields.email != null) errorName = 'EmailConflict';
    else if (error.fields[0] === 'mobile' || error.fields.mobile != null) errorName = 'MobileConflict';
    else if (error.fields[0] === 'nickname' || error.fields.nickname != null) errorName = 'NicknameConflict';
  }

  if (ERROR_TABLE[errorName]) errorData = ERROR_TABLE[errorName];
  else {
    errorName = 'ServerError';
    errorData = ERROR_TABLE.ServerError;
  }

  if (errorName === 'InvalidRequest' && error.data) errorData[1] = error.data.field + ' 필드가 ' + error.data.type + ' 형식이 아닙니다.';
  if (errorData[2]) {
    console.error(
      `==== Error at ${new Date().toString()} ====
      ${req.method} ${req.originalUrl}
      IP: ${req.ip}
      Query:
      ${truncateStripData(req.query)}
      Cookies:
      ${truncateStripData(req.cookies)}
      Headers:
      ${truncateStripData(req.headers)}
      Body:
      ${truncateStripData(req.body)} `,
    );
  }

  console.error(error);
  res.status(errorData[0]);
  res.json({ error: { code: errorData[0], type: errorName, message: errorData[1] } });
};
