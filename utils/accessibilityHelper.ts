import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

export type AccessibilityImpact = 'minor' | 'moderate' | 'serious' | 'critical';

export type AccessibilityViolation = {
    id: string;
    impact: AccessibilityImpact | null;
    description: string;
    help: string;
    helpUrl: string;
    tags: string[];
    nodes: Array<{
        target: string[];
        html: string;
        failureSummary?: string;
    }>;
};

export type AccessibilityOptions = {
    tags?: string[];
    impacts?: AccessibilityImpact[];
    include?: string[];
    exclude?: string[];
};

const defaultImpacts: AccessibilityImpact[] = ['critical', 'serious'];

export async function checkAccessibility(
    page: Page,
    options: AccessibilityOptions = {}
): Promise<AccessibilityViolation[]> {
    const impactsToCheck = options.impacts ?? defaultImpacts;
    const axeBuilder = new AxeBuilder({ page });

    // Tags let us focus the scan on standards such as WCAG 2 A/AA when needed.
    if (options.tags?.length) {
        axeBuilder.withTags(options.tags);
    }

    // Include/exclude are useful when a page has a known third-party widget or a specific area to scan.
    options.include?.forEach((selector) => axeBuilder.include(selector));
    options.exclude?.forEach((selector) => axeBuilder.exclude(selector));

    const results = await axeBuilder.analyze();

    return results.violations.filter((violation) =>
        violation.impact ? impactsToCheck.includes(violation.impact as AccessibilityImpact) : false
    );
}

export function formatAccessibilityViolations(violations: AccessibilityViolation[]): string {
    if (violations.length === 0) {
        return 'No critical or serious accessibility violations were found.';
    }

    return violations
        .map((violation) => {
            const affectedElements = violation.nodes
                .map((node) => {
                    const target = node.target.join(', ');
                    const failure = node.failureSummary ? `\n      ${node.failureSummary}` : '';

                    return `    - Target: ${target}\n      HTML: ${node.html}${failure}`;
                })
                .join('\n');

            return [
                `Rule: ${violation.id}`,
                `Impact: ${violation.impact}`,
                `Help: ${violation.help}`,
                `Docs: ${violation.helpUrl}`,
                `Affected elements:\n${affectedElements}`,
            ].join('\n');
        })
        .join('\n\n');
}
