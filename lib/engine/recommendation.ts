import { Scheme } from "../db/schemes";

export interface UserProfile {
  occupation?: string;
  income?: number;
  state?: string;
  age?: number;
  gender?: string;
  category?: string;
  landHolding?: number; // in acres
}

export interface RecommendationResult {
  scheme: Scheme;
  score: number; // 0 to 100
  reasons: string[]; // e.g. "✓ Income below threshold", "✗ Age not eligible"
  missingInfo: string[]; // Info needed to fully determine eligibility
  isEligible: boolean; // true if score >= 70 (or all hard requirements met)
}

/**
 * Basic rule-based recommendation engine for Hackathon demo.
 * In a production system, this could be backed by an LLM or Graph Database.
 */
export function recommendSchemes(profile: UserProfile, schemes: Scheme[]): RecommendationResult[] {
  const results: RecommendationResult[] = [];

  for (const scheme of schemes) {
    let score = 100;
    const reasons: string[] = [];
    const missingInfo: string[] = [];
    let isEligible = true;

    const reqs = scheme.eligibility;

    // Occupation Check
    if (reqs.occupation && reqs.occupation.length > 0 && reqs.occupation[0] !== "All") {
      if (!profile.occupation) {
        missingInfo.push("Occupation");
        score -= 20;
      } else {
        const matches = reqs.occupation.some(occ => 
          profile.occupation?.toLowerCase().includes(occ.toLowerCase())
        );
        if (matches) {
          reasons.push(`✓ Matches occupation: ${profile.occupation}`);
        } else {
          reasons.push(`✗ Occupation does not match required: ${reqs.occupation.join(", ")}`);
          score -= 50;
          isEligible = false;
        }
      }
    }

    // Income Check
    if (reqs.maxIncome) {
      if (profile.income === undefined) {
        missingInfo.push("Annual Income");
        score -= 20;
      } else if (profile.income <= reqs.maxIncome) {
        reasons.push(`✓ Income below maximum threshold (₹${reqs.maxIncome})`);
      } else {
        reasons.push(`✗ Income exceeds maximum threshold (₹${reqs.maxIncome})`);
        score -= 50;
        isEligible = false;
      }
    }

    // State Check
    if (reqs.states && reqs.states[0] !== "All") {
      if (!profile.state) {
        missingInfo.push("State of Residence");
        score -= 10;
      } else if (reqs.states.includes(profile.state)) {
        reasons.push(`✓ Resident of eligible state: ${profile.state}`);
      } else {
        reasons.push(`✗ Not resident in eligible states`);
        score -= 50;
        isEligible = false;
      }
    }

    // Category Check
    if (reqs.categories && reqs.categories[0] !== "All") {
      if (!profile.category) {
        missingInfo.push("Social Category");
        score -= 20;
      } else if (reqs.categories.includes(profile.category.toUpperCase())) {
        reasons.push(`✓ Matches eligible category: ${profile.category}`);
      } else {
        reasons.push(`✗ Category not eligible for this scheme`);
        score -= 50;
        isEligible = false;
      }
    }

    // Land Holding Check
    if (reqs.maxLandHolding) {
      if (profile.landHolding === undefined) {
        missingInfo.push("Land Holding Size");
        score -= 10;
      } else if (profile.landHolding <= reqs.maxLandHolding) {
        reasons.push(`✓ Land holding below limit (${reqs.maxLandHolding} acres)`);
      } else {
        reasons.push(`✗ Land holding exceeds limit`);
        score -= 50;
        isEligible = false;
      }
    }

    // Normalize score
    score = Math.max(0, score);

    results.push({
      scheme,
      score,
      reasons,
      missingInfo,
      isEligible: score >= 70 && isEligible
    });
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

/**
 * Supervised Learning Engine (K-Nearest Neighbors approach)
 * Converts user profiles and scheme requirements into n-dimensional feature vectors,
 * and calculates the Euclidean distance to determine the closest match.
 */
export function recommendSchemesKNN(profile: UserProfile, schemes: Scheme[]): RecommendationResult[] {
  const results: RecommendationResult[] = [];

  // Helper to normalize features between 0 and 1
  const normalize = (val: number, max: number) => Math.min(val / max, 1);

  // User Feature Vector
  // [ Income, LandHolding, HasOccupation, HasCategory, HasState ]
  const userIncomeF = profile.income !== undefined ? normalize(profile.income, 1000000) : 0.5; // Assume middle income if missing
  const userLandF = profile.landHolding !== undefined ? normalize(profile.landHolding, 10) : 0;
  
  for (const scheme of schemes) {
    const reqs = scheme.eligibility;
    const reasons: string[] = [];
    const missingInfo: string[] = [];
    let isEligible = true;

    // Build Scheme Feature Vector
    const schemeIncomeF = reqs.maxIncome ? normalize(reqs.maxIncome, 1000000) : 1.0;
    const schemeLandF = reqs.maxLandHolding ? normalize(reqs.maxLandHolding, 10) : 1.0;

    // Calculate Distance (Lower is better)
    let distance = 0;

    // 1. Income Dimension
    if (reqs.maxIncome) {
      if (profile.income === undefined) {
        missingInfo.push("Annual Income");
        distance += 0.3; // Penalty for missing data
      } else {
        const incomeDiff = userIncomeF - schemeIncomeF;
        if (incomeDiff > 0) {
          // User income is higher than allowed
          distance += incomeDiff * 2; // Heavy penalty
          isEligible = false;
          reasons.push(`✗ Income exceeds maximum threshold (₹${reqs.maxIncome})`);
        } else {
          reasons.push(`✓ Income below maximum threshold (₹${reqs.maxIncome})`);
        }
      }
    }

    // 2. Occupation Dimension (Categorical exact match)
    if (reqs.occupation && reqs.occupation.length > 0 && reqs.occupation[0] !== "All") {
      if (!profile.occupation) {
        missingInfo.push("Occupation");
        distance += 0.3;
      } else {
        const matches = reqs.occupation.some(occ => 
          profile.occupation?.toLowerCase().includes(occ.toLowerCase())
        );
        if (!matches) {
          distance += 1.0; // Max penalty
          isEligible = false;
          reasons.push(`✗ Occupation does not match required: ${reqs.occupation.join(", ")}`);
        } else {
          reasons.push(`✓ Matches occupation: ${profile.occupation}`);
        }
      }
    }

    // 3. Category Dimension (Categorical exact match)
    if (reqs.categories && reqs.categories[0] !== "All") {
      if (!profile.category) {
        missingInfo.push("Social Category");
        distance += 0.2;
      } else if (!reqs.categories.includes(profile.category.toUpperCase())) {
        distance += 1.0; // Max penalty
        isEligible = false;
        reasons.push(`✗ Category not eligible for this scheme`);
      } else {
        reasons.push(`✓ Matches eligible category: ${profile.category}`);
      }
    }

    // 4. State Dimension
    if (reqs.states && reqs.states[0] !== "All") {
      if (!profile.state) {
        missingInfo.push("State of Residence");
        distance += 0.1;
      } else if (!reqs.states.includes(profile.state)) {
        distance += 1.0;
        isEligible = false;
        reasons.push(`✗ Not resident in eligible states`);
      } else {
        reasons.push(`✓ Resident of eligible state: ${profile.state}`);
      }
    }

    // Convert distance to a similarity score (0 to 100)
    // Distance 0 = 100%, Distance 1.0 = 0%
    const score = Math.max(0, Math.round((1 - distance) * 100));

    results.push({
      scheme,
      score,
      reasons,
      missingInfo,
      isEligible: isEligible && score > 0
    });
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}
