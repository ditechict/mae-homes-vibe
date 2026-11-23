# Improve Property Catalogue Discovery

## Goal
Help buyers find relevant Mae & Homes listings more quickly while preserving the existing catalogue, listing details, and verified/unverified safeguards.

## Proposed changes
- **Search:** Make the search intent clearer and broaden matching across listing names, neighbourhoods, cities, references, property types, and key specifications. Keep searches shareable through the existing URL-based filters.
- **Filters:** Make the available filters easier to scan and use on small screens; clarify budget and bedroom choices, show active selections, and provide a single clear way to reset them. Preserve existing city, status, type, price, bedroom, sort, and pagination behavior.
- **Navigation:** Make the path from the home page and site menu into the full catalogue obvious, and provide consistent direct access to Lagos, Abuja, and land results without removing existing menu links or hash-based paths.
- **No results:** Explain that no listings match the current choices, surface the active filters, offer a one-step reset, and give specific suggestions such as broadening the budget or changing the location. Keep the existing enquiry link as an alternative.

## Safeguards and boundaries
- Keep all existing listings and property detail pages intact; do not invent inventory or alter prices, claims, or verification status.
- Do not add saved enquiries, backend storage, or new trust claims as part of this work.
- Use the current design tokens and existing navigation patterns.

## Technical details
- Keep the existing TanStack Router search parameters as the source of truth so filters remain bookmarkable and browser navigation works.
- Keep changes focused on the catalogue page and the existing navigation entry points; do not redesign the home page or add top-level menu items.

## Verification
- Check text search, each existing filter, combined filters, sorting, pagination, reset, and direct links with query parameters.
- Confirm the no-results state offers useful recovery actions and that existing home-page links and mobile navigation still reach the intended catalogue views.
- Verify desktop and mobile presentation and check the preview build for errors.
