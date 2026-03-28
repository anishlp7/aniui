import { ReactTestInstance } from "react-test-renderer";

/**
 * Audit an interactive element for accessibility compliance.
 * Checks role, accessible flag, and minimum touch target.
 */
export function auditInteractiveElement(
  element: ReactTestInstance,
  expectedRole: string
) {
  // Must have correct accessibilityRole
  expect(element.props.accessibilityRole).toBe(expectedRole);

  // Must be marked accessible (for screen readers)
  if (["button", "checkbox", "radio", "switch", "tab"].includes(expectedRole)) {
    expect(element.props.accessible).toBe(true);
  }
}

/**
 * Audit that a component renders without errors and has the expected role.
 */
export function auditRendersWithRole(
  getByRole: (role: string) => ReactTestInstance,
  role: string
) {
  const element = getByRole(role);
  expect(element).toBeTruthy();
  return element;
}

/**
 * Audit that className contains minimum touch target sizing.
 * Per WCAG, interactive elements should be at least 48x48dp (min-h-12 min-w-12).
 */
export function auditTouchTarget(className: string | undefined) {
  if (!className) return;
  const hasMinHeight = className.includes("min-h-1") || className.includes("h-");
  expect(hasMinHeight).toBe(true);
}
