import { springs, entering, exiting, duration, easing } from "../ui/animate";

describe("animate", () => {
  it("exports springs object with expected keys", () => {
    expect(springs).toBeDefined();
    expect(springs.bouncy).toBeDefined();
    expect(springs.snappy).toBeDefined();
    expect(springs.gentle).toBeDefined();
    expect(springs.stiff).toBeDefined();
    expect(springs.default).toBeDefined();
  });

  it("exports entering object with expected keys", () => {
    expect(entering).toBeDefined();
    expect(entering.fadeIn).toBeDefined();
    expect(entering.fadeInUp).toBeDefined();
    expect(entering.fadeInDown).toBeDefined();
    expect(entering.slideInUp).toBeDefined();
    expect(entering.slideInDown).toBeDefined();
    expect(entering.slideInLeft).toBeDefined();
    expect(entering.slideInRight).toBeDefined();
    expect(entering.zoomIn).toBeDefined();
    expect(entering.bounceIn).toBeDefined();
    expect(entering.flipInX).toBeDefined();
  });

  it("exports exiting object with expected keys", () => {
    expect(exiting).toBeDefined();
    expect(exiting.fadeOut).toBeDefined();
    expect(exiting.fadeOutUp).toBeDefined();
    expect(exiting.fadeOutDown).toBeDefined();
    expect(exiting.slideOutUp).toBeDefined();
    expect(exiting.slideOutDown).toBeDefined();
    expect(exiting.zoomOut).toBeDefined();
  });

  it("exports duration constants", () => {
    expect(duration.fast).toBe(150);
    expect(duration.normal).toBe(250);
    expect(duration.slow).toBe(400);
    expect(duration.slower).toBe(600);
  });

  it("exports easing constants", () => {
    expect(easing).toBeDefined();
    expect(easing.easeOut).toBeDefined();
    expect(easing.easeIn).toBeDefined();
    expect(easing.easeInOut).toBeDefined();
    expect(easing.spring).toBeDefined();
    expect(easing.bounce).toBeDefined();
  });
});
