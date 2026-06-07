// projectId en dataset zijn publiek (zitten sowieso in de client-bundle),
// dus we vallen veilig terug op de bekende waarden als de env-var ontbreekt.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "9bgqlu9w";
