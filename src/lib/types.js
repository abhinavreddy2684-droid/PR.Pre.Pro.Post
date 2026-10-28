// Shared shapes, documented once. Import in JSDoc as import("@/lib/types").Talent etc.
// The "API" section mirrors openapi.yaml in the backend repo (the source of truth); the rest
// describes mock data that has not been wired yet.

// ---------------------------------------------------------------------------------------------
// API

/**
 * Body of every error response: {"error": {...}}.
 * @typedef {object} ApiErrorBody
 * @property {string} code     branch on this
 * @property {string} message  safe to show for domain errors
 * @property {unknown} details field errors as { field: string[] }, or extra data
 */

/**
 * A cursor-paginated list. Follow `next` / `previous` as given; there is no total count.
 * @template T
 * @typedef {object} Page
 * @property {string | null} next
 * @property {string | null} previous
 * @property {T[]} results
 */

/**
 * GET /api/me, and `user` in the register response.
 * @typedef {object} Me
 * @property {string} id  UUID
 * @property {string} email
 * @property {boolean} email_verified
 * @property {string[]} roles
 */

/**
 * @typedef {object} BootstrapTalentType
 * @property {string} id
 * @property {string} slug
 * @property {string} title
 */

/**
 * @typedef {object} BootstrapCraft
 * @property {string} id
 * @property {string} slug  how crafts are referenced in requests and URLs
 * @property {string} title
 * @property {string} description
 * @property {BootstrapTalentType[]} talent_types
 */

/**
 * @typedef {object} BootstrapCity
 * @property {string} id  sent as `city_id`
 * @property {string} slug
 * @property {string} name
 */

/**
 * A state or union territory.
 * @typedef {object} BootstrapLocation
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {BootstrapCity[]} cities
 */

/**
 * @typedef {object} EnumOption
 * @property {string} value
 * @property {string} label
 */

/**
 * GET /api/bootstrap. `enums` includes genders, availability_statuses, gallery_stages,
 * media_kinds, media_failure_reasons and moderation_reasons.
 * @typedef {object} Bootstrap
 * @property {string} version
 * @property {BootstrapCraft[]} crafts
 * @property {BootstrapLocation[]} locations
 * @property {Record<string, EnumOption[]>} enums
 */

/**
 * @typedef {object} CityOut
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} state_slug
 * @property {string} state_name
 */

/**
 * @typedef {object} TalentCraftOut
 * @property {string} slug
 * @property {string} title
 * @property {boolean} [is_primary]
 */

/**
 * @typedef {object} SignedUrls
 * @property {string} original
 * @property {Record<string, string>} thumbnails  by longest edge, e.g. "96", "400"
 * @property {string} expires_at  refetch the owner resource after this
 */

/**
 * A search result from GET /api/talent. Public fields only.
 * @typedef {object} TalentCard
 * @property {string} id
 * @property {string} professional_name
 * @property {string} [bio]  full bio (<= 1000 chars), may be empty
 * @property {CityOut | null} city
 * @property {number | null} [years_experience]
 * @property {string[]} [genres]
 * @property {{ slug: string, title: string } | null} primary_craft
 * @property {SignedUrls | null} avatar  thumbnails "96" and "400"
 * @property {boolean} is_available  false only when the next 7 days are all unavailable
 */

/**
 * One work-history entry. `end_year` null means ongoing ("Present").
 * @typedef {object} Experience
 * @property {string} id
 * @property {string} title
 * @property {string} [company]
 * @property {number} start_year
 * @property {number | null} [end_year]
 * @property {string} [description]
 * @property {string} craft  a craft slug on the talent's profile, or ""
 */

/**
 * GET /api/talent/{id}: a published talent's public profile.
 * @typedef {object} PublicTalent
 * @property {string} id
 * @property {string} professional_name
 * @property {string} [bio]
 * @property {CityOut | null} city
 * @property {number | null} [years_experience]
 * @property {string[]} [genres]
 * @property {string | null} avatar_id
 * @property {SignedUrls | null} avatar
 * @property {TalentCraftOut[]} crafts
 * @property {Experience[]} experiences
 */

/**
 * GET /api/talent/me (the owner's own profile, including private fields).
 * @typedef {object} PrivateTalent
 * @property {string} id
 * @property {string} professional_name
 * @property {string} [bio]
 * @property {CityOut | null} city
 * @property {number | null} [years_experience]
 * @property {string[]} [genres]
 * @property {string | null} avatar_id
 * @property {SignedUrls | null} avatar
 * @property {TalentCraftOut[]} crafts
 * @property {Experience[]} experiences
 * @property {string} full_name  private: never shown on public views
 * @property {boolean} [is_published]
 * @property {boolean} onboarding_completed
 * @property {Record<string, unknown>} completeness
 */

// ---------------------------------------------------------------------------------------------
// Mock shapes (not wired yet)

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

export {};
