/** @module helpers **/

/**
 *
 * @param   {number} value
 * @returns {boolean} confirm this is a integer
 */
export function isNumber(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value)) {
    return true;
  }
  return false;
}

/**
 *
 * @param   {number} value [[Description]]
 * @returns {boolean} confirm this is a positve number
 */
export function isPositiveNumber(value) {
  if (isNumber(value) && value > 0) {
    return true;
  }
  return false;
}

/**
 *
 * @param   {number} position to validate
 * @param   {[[Type]]} boundaries to validate position against
 * @returns {boolean}
 */
export function isPosSafe(pos, posBounds) {
  if (pos < 0 || pos > Number.parseInt(posBounds, 10)) {
    return false;
  }
  return true;
}

const emoji = new Map();
emoji.set('LOST', ['🆘', ':sos:']);
emoji.set('N', ['⬆️', ':arrow_up:']);
emoji.set('S', ['⬇️', ':arrow_down:']);
emoji.set('E', ['➡️', ':arrow_right:']);
emoji.set('W', ['⬅️', ':arrow_left:']);
emoji.set('Martian', ['👾', ':space_invader:']);
emoji.set('Robot', ['🤖', ':robot_face:']);

/*
 * matcher for str.replace
 */
export function strToEmoji(match) {
  return emoji.get(match)[0];
}

/**
 * Get emoji representation of being status
 * @param   {string} being status
 * @returns {string} transformed string
 */
export function beingAsEmoji(str) {
  const regex = /N|S|E|W|(\bLOST\b)|(\bMartian\b)|(\bRobot\b)/g;
  return `${str.replace(regex, strToEmoji)}`;
}
