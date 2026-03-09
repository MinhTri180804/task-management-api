/**
 * Get milliseconds from number of days.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.days - The number of days.
 * @return {number} The number of milliseconds.
 */
export function getMillisecondFromDays({ days }: { days: number }): number {
  return days * 24 * 60 * 60 * 1000;
}

/**
 * Get milliseconds from number of hours.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.hours - The number of hours.
 * @return {number} The number of milliseconds.
 */
export function getMillisecondFromHours({ hours }: { hours: number }): number {
  return hours * 60 * 60 * 1000;
}

/**
 * Get milliseconds from number of minutes.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.minutes - The number of minutes.
 * @return {number} The number of milliseconds.
 */
export function getMillisecondFromMinute({
  minutes,
}: {
  minutes: number;
}): number {
  return minutes * 60 * 1000;
}

/**
 * Get milliseconds from number of seconds.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.seconds - The number of seconds.
 * @return {number} The number of milliseconds.
 */
export function getMillisecondFromSeconds({
  seconds,
}: {
  seconds: number;
}): number {
  return seconds * 1000;
}

/**
 * Get seconds from number of days.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.days - The number of days.
 * @return {number} The number of seconds.
 */
export function getSecondFromDays({ days }: { days: number }): number {
  return days * 24 * 60 * 60;
}

/**
 * Get seconds from number of hours.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.hours - The number of hours.
 * @return {number} The number of seconds.
 */
export function getSecondFromHours({ hours }: { hours: number }): number {
  return hours * 60 * 60;
}

/**
 * Get seconds from number of minutes.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.minutes - The number of minutes.
 * @return {number} The number of seconds.
 */
export function getSecondFromMinutes({ minutes }: { minutes: number }): number {
  return minutes * 60;
}

/**
 * Get seconds from number of seconds.
 *
 * @param {Object} params - The parameters for the function.
 * @param {number} params.seconds - The number of seconds.
 * @return {number} The number of seconds.
 */
export function getSecondFromSeconds({ seconds }: { seconds: number }): number {
  return seconds;
}
