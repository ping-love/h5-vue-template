import http from '@/utils/http'

export default {
  // 消费挖矿
  getConsumetMining: () => http('/live/user/consume/mining', {}, 'get'),
  // 首页(用户信息)
  getTsInfo: () => http('/live/user/ts/info', {}, 'get')
}
