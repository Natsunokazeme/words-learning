import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import localFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localFormat)
dayjs.locale('zh-cn')

export default dayjs

