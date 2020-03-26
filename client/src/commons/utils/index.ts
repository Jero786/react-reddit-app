const URL_REGEX = /^(((H|h)(T|t)(T|t)(P|p)(S|s)?):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,100}\.[a-zA-Z]{2,10}(\/([-a-zA-Z0-9@:%_\+.~#?&//=]*))?/

/**
 * Validate if given url is valid or not.
 * @param url
 */
export const isValidUrl = (url: string) => {
    return URL_REGEX.test(url);
};
