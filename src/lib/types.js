// Shared shapes, documented once. Import in JSDoc as import("@/lib/types").Talent etc.
// They describe today's mock data and are the contract the API responses should meet.

/**
 * @typedef {object} Craft
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string[]} talentTypes
 */

/**
 * @typedef {object} MediaItem
 * @property {number | string} id
 * @property {string} title
 * @property {string} description
 * @property {"Video" | "Audio" | "Image"} type
 * @property {number} year
 * @property {number} [likes]
 * @property {string} [image]
 */

/**
 * @typedef {object} ExperienceEntry
 * @property {string} period  e.g. "2021 — Present"
 * @property {string} title
 * @property {string} company
 * @property {string} description
 * @property {string} craft
 */

/**
 * @typedef {object} Talent
 * @property {number} id
 * @property {string} name
 * @property {string} craft  primary craft, matches Craft.title
 * @property {string} [role]
 * @property {string} location  "City, Country"
 * @property {string} experience  e.g. "8 years"
 * @property {string[]} genres
 * @property {"Available" | "On request"} availability
 * @property {string} image
 * @property {string} bio
 * @property {MediaItem[]} [media]
 * @property {ExperienceEntry[]} [experiences]
 */

export {};
