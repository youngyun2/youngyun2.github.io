import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
 
// 启用时区支持
dayjs.extend(utc); 
dayjs.extend(timezone); 
 
/**
 * 获取时间剩余的函数（基于中国标准时间 CST）
 * @return {Object} 包含 day、week、month 和 year 的剩余时间信息
 */
export const getTimeRemaining = () => {
  const now = dayjs().tz("Asia/Shanghai"); // 设置为中国标准时间
  const dayText = {
    day: "今日",
    week: "本周",
    month: "本月",
    year: "本年",
  };
 
  /**
   * 计算时间差的函数
   * @param {String} unit 时间单位，可以是 'day', 'week', 'month', 'year'
   */
  const getDifference = (unit) => {
    // 获取当前时间单位的开始时间
    const start = now.startOf(unit).tz("Asia/Shanghai"); 
    const end = now.endOf(unit).tz("Asia/Shanghai"); 
 
    const total = end.diff(start,  unit === "day" ? "hour" : "day") + 1;
    let passed;
 
    if (unit === "week" && now.day()  === 0) {
      // 如果是星期日 
      passed = total - 1;
    } else {
      passed = now.diff(start,  unit === "day" ? "hour" : "day");
    }
 
    const remaining = total - passed;
    const percentage = (passed / total) * 100;
 
    return {
      name: dayText[unit],
      total: total,
      passed: passed,
      remaining: remaining,
      percentage: percentage.toFixed(2), 
    };
  };
 
  return {
    day: getDifference("day"),
    week: getDifference("week"),
    month: getDifference("month"),
    year: getDifference("year"),
  };
};
 
/**
 * 计算当前日期距离指定日期的天数（基于中国标准时间 CST）
 * @param {string} dateStr - 指定的日期，格式为 'YYYY-MM-DD'
 * @return {number} 返回的天数
 */
export const getDaysUntil = (dateStr) => {
  const now = dayjs().tz("Asia/Shanghai");
  const targetDate = dayjs(dateStr).tz("Asia/Shanghai");
  const daysUntil = targetDate.diff(now,  "day");
  return daysUntil;
};
 
/**
 * 格式化日期字符串（基于中国标准时间 CST）
 * 如果日期与当前年份相同，则返回 "月/日" 格式
 * 如果日期不与当前年份相同，则返回 "年/月/日" 格式 
 * @param {string} dateString - 需要转换的日期字符串，格式为 "YYYY/MM/DD" 或 "YYYY-MM-DD"
 * @returns {string} 格式化后的日期
 */
export const formatDate = (dateString) => {
  // 解析日期并转换为 CST 时间
  const date = dayjs.tz(dateString,  "Asia/Shanghai").toDate();
  const currentYear = new Date().getFullYear();
  return date.getFullYear()  === currentYear
    ? `${date.getMonth()  + 1}/${date.getDate()}` 
    : `${date.getFullYear()}/${date.getMonth()  + 1}/${date.getDate()}`; 
};
