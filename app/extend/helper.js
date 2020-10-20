'use strict';
exports.getAccessToken = ctx => {
  const bearerToken = ctx.request.header.authorization;
  return bearerToken && bearerToken.replace('Bearer ', '');
};
exports.verifyToken = async (ctx, userId) => {
  const token = this.getAccessToken(ctx);
  const verifyResult = await ctx.service.user.verifyToken(token);
  if (!verifyResult.verify) {
    ctx.helper.error(ctx, 401, verifyResult.message);
    return false;
  }
  if (userId !== verifyResult.message.message.id) {
    ctx.helper.error(ctx, 401, '用户ID与Token不一致');
  }
  return true;
};
exports.success = (ctx, result = null, message = '请求成功', status = 200) => {
  ctx.body = {
    code: 0,
    message,
    data: result,
  };
  ctx.status = status;
};
exports.error = (ctx, code, message) => {
  ctx.body = {
    code,
    message,
  };
  ctx.status = code;
};
