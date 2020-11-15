import md5 from 'js-md5';

/**
 * Returns the Avatar URL to be used for the participant.
 *
 * @param {string} [participant.avatarID] - Participant's avatar ID.
 * @param {string} [participant.email] - Participant's e-mail address.
 * @param {string} [participant.id] - Participant's ID.
 * @param {string} [avatarService.urlPrefix] - URL Prefix of the avatar service.
 * @param {string} [avatarService.urlSuffix] - URL Suffix of the avatar service.
 * @returns {string} - Avatar URL.
 */
export function getAvatarURL(participant, avatarService = {}) {
    const { avatarID, email, id } = participant;
    const { urlPrefix = 'https://abotars.jitsi.net/meeple/', urlSuffix = '' } = avatarService;

    return getGravatarURL(email)
        || generateAvatarURL(avatarID || id, urlPrefix, urlSuffix);
}

/**
 * Returns the Avatar URL generated from the given avatar service.
 *
 * @param {string} key - Key using which avatar has to be generated.
 * @param {string} urlPrefix - URL Prefix of the avatar service to be used.
 * @param {string} urlSuffix - URL Suffix of the avatar service to be used.
 * @returns {string}
 */
function generateAvatarURL(key, urlPrefix, urlSuffix) {
    return urlPrefix + md5.hex(key.trim().toLowerCase()) + urlSuffix;
}

/**
 * Returns the Gravatar URL of a given email id.
 *
 * @param {string} key - Email or id for which we need gravatar URL.
 * @param {string} baseURL - Base Gravatar URL.
 * @returns {string} - Gravatar URL.
 */
export function getGravatarURL(key, baseURL = 'https://seccdn.libravatar.org/avatar/') {
    const urlSuffix = '?d=404&size=200';

    // If the key is a valid email, we hash it. If it's not, we assume it's already a hashed format
    const avatarKey = isValidEmail(key) ? md5.hex(key.trim().toLowerCase()) : key;

    return `${baseURL}${avatarKey}${urlSuffix}`;
}

/**
 * Returns if the email id is valid.
 *
 * @param {string} email - Email id to be checked.
 * @returns {boolean}
 */
function isValidEmail(email) {
    return email && email.indexOf('@') > 0;
}
