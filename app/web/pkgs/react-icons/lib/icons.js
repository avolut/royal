import React from "react";
import wrapIcon from "./utils/wrapIcon";

const ArrowUpRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3.13 9.16a.5.5 0 1 0 .74.68L9.5 3.67V17.5a.5.5 0 1 0 1 0V3.67l5.63 6.17a.5.5 0 0 0 .74-.68l-6.32-6.92a.75.75 0 0 0-1.1 0L3.13 9.16Z",
      fill: primaryFill,
    })
  );
};

export const ArrowUpRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowUpRegularIcon,
  "ArrowUpRegular"
);

const ArrowDownRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M16.87 10.84a.5.5 0 1 0-.74-.68l-5.63 6.17V2.5a.5.5 0 0 0-1 0v13.83l-5.63-6.17a.5.5 0 0 0-.74.68l6.31 6.91a.75.75 0 0 0 1.11 0l6.32-6.91Z",
      fill: primaryFill,
    })
  );
};

export const ArrowDownRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowDownRegularIcon,
  "ArrowDownRegular"
);

const ChevronRightRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7.65 4.15c.2-.2.5-.2.7 0l5.49 5.46c.21.22.21.57 0 .78l-5.49 5.46a.5.5 0 0 1-.7-.7L12.8 10 7.65 4.85a.5.5 0 0 1 0-.7Z",
      fill: primaryFill,
    })
  );
};

export const ChevronRightRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronRightRegularIcon,
  "ChevronRightRegular"
);

const ChevronDownRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M15.85 7.65c.2.2.2.5 0 .7l-5.46 5.49a.55.55 0 0 1-.78 0L4.15 8.35a.5.5 0 1 1 .7-.7L10 12.8l5.15-5.16c.2-.2.5-.2.7 0Z",
      fill: primaryFill,
    })
  );
};

export const ChevronDownRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronDownRegularIcon,
  "ChevronDownRegular"
);

const CircleFilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z",
      fill: primaryFill,
    })
  );
};

export const CircleFilled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ CircleFilledIcon,
  "CircleFilled"
);

const CheckmarkFilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7.03 13.9 3.56 10a.75.75 0 0 0-1.12 1l4 4.5c.29.32.79.34 1.09.03l10.5-10.5a.75.75 0 0 0-1.06-1.06l-9.94 9.94Z",
      fill: primaryFill,
    })
  );
};

export const CheckmarkFilled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ CheckmarkFilledIcon,
  "CheckmarkFilled"
);

const ChevronRightFilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7.73 4.2a.75.75 0 0 1 1.06.03l5 5.25c.28.3.28.75 0 1.04l-5 5.25a.75.75 0 1 1-1.08-1.04L12.2 10l-4.5-4.73a.75.75 0 0 1 .02-1.06Z",
      fill: primaryFill,
    })
  );
};

export const ChevronRightFilled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronRightFilledIcon,
  "ChevronRightFilled"
);

const ChevronLeftFilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M12.27 15.8a.75.75 0 0 1-1.06-.03l-5-5.25a.75.75 0 0 1 0-1.04l5-5.25a.75.75 0 1 1 1.08 1.04L7.8 10l4.5 4.73c.29.3.28.78-.02 1.06Z",
      fill: primaryFill,
    })
  );
};

export const ChevronLeftFilled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronLeftFilledIcon,
  "ChevronLeftFilled"
);

const ChevronLeftRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M12.35 15.85a.5.5 0 0 1-.7 0L6.16 10.4a.55.55 0 0 1 0-.78l5.49-5.46a.5.5 0 1 1 .7.7L7.2 10l5.16 5.15c.2.2.2.5 0 .7Z",
      fill: primaryFill,
    })
  );
};

export const ChevronLeftRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronLeftRegularIcon,
  "ChevronLeftRegular"
);

const MoreHorizontalRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M6.25 10a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Zm5 0a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0ZM15 11.25a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z",
      fill: primaryFill,
    })
  );
};

export const MoreHorizontalRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ MoreHorizontalRegularIcon,
  "MoreHorizontalRegular"
);

const PersonRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M10 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM7 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-2 5a2 2 0 0 0-2 2c0 1.7.83 2.97 2.13 3.8A9.14 9.14 0 0 0 10 18c1.85 0 3.58-.39 4.87-1.2A4.35 4.35 0 0 0 17 13a2 2 0 0 0-2-2H5Zm-1 2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1c0 1.3-.62 2.28-1.67 2.95A8.16 8.16 0 0 1 10 17a8.16 8.16 0 0 1-4.33-1.05A3.36 3.36 0 0 1 4 13Z",
      fill: primaryFill,
    })
  );
};

export const PersonRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ PersonRegularIcon,
  "PersonRegular"
);

const Checkmark12FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M9.76 3.2c.3.29.32.76.04 1.06l-4.25 4.5a.75.75 0 0 1-1.08.02L2.22 6.53a.75.75 0 0 1 1.06-1.06l1.7 1.7L8.7 3.24a.75.75 0 0 1 1.06-.04Z",
      fill: primaryFill,
    })
  );
};

export const Checkmark12Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Checkmark12FilledIcon,
  "Checkmark12Filled"
);

const Checkmark16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M14.05 3.49c.28.3.27.77-.04 1.06l-7.93 7.47A.85.85 0 0 1 4.9 12L2.22 9.28a.75.75 0 1 1 1.06-1.06l2.24 2.27 7.47-7.04a.75.75 0 0 1 1.06.04Z",
      fill: primaryFill,
    })
  );
};

export const Checkmark16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Checkmark16FilledIcon,
  "Checkmark16Filled"
);

const CheckmarkCircle12FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M1 6a5 5 0 1 1 10 0A5 5 0 0 1 1 6Zm7.35-.9a.5.5 0 1 0-.7-.7L5.5 6.54 4.35 5.4a.5.5 0 1 0-.7.7l1.5 1.5c.2.2.5.2.7 0l2.5-2.5Z",
      fill: primaryFill,
    })
  );
};

export const CheckmarkCircle12Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ CheckmarkCircle12FilledIcon,
  "CheckmarkCircle12Filled"
);

const ChevronUp16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3.15 10.35c.2.2.5.2.7 0L8 6.21l4.15 4.14a.5.5 0 0 0 .7-.7l-4.5-4.5a.5.5 0 0 0-.7 0l-4.5 4.5a.5.5 0 0 0 0 .7Z",
      fill: primaryFill,
    })
  );
};

export const ChevronUp16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronUp16RegularIcon,
  "ChevronUp16Regular"
);

const ChevronDown16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3.15 5.65c.2-.2.5-.2.7 0L8 9.79l4.15-4.14a.5.5 0 0 1 .7.7l-4.5 4.5a.5.5 0 0 1-.7 0l-4.5-4.5a.5.5 0 0 1 0-.7Z",
      fill: primaryFill,
    })
  );
};

export const ChevronDown16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronDown16RegularIcon,
  "ChevronDown16Regular"
);

const Dismiss24RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "m4.4 4.55.07-.08a.75.75 0 0 1 .98-.07l.08.07L12 10.94l6.47-6.47a.75.75 0 1 1 1.06 1.06L13.06 12l6.47 6.47c.27.27.3.68.07.98l-.07.08a.75.75 0 0 1-.98.07l-.08-.07L12 13.06l-6.47 6.47a.75.75 0 0 1-1.06-1.06L10.94 12 4.47 5.53a.75.75 0 0 1-.07-.98l.07-.08-.07.08Z",
      fill: primaryFill,
    })
  );
};

export const Dismiss24Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Dismiss24RegularIcon,
  "Dismiss24Regular"
);

const ErrorCircle12FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Zm-.75-2.75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm.26-4.84a.5.5 0 0 1 .98 0l.01.09v2.59a.5.5 0 0 1-1 0V3.41Z",
      fill: primaryFill,
    })
  );
};

export const ErrorCircle12Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ErrorCircle12FilledIcon,
  "ErrorCircle12Filled"
);

const Square12FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 4c0-1.1.9-2 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z",
      fill: primaryFill,
    })
  );
};

export const Square12Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Square12FilledIcon,
  "Square12Filled"
);

const Square16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5v-7Z",
      fill: primaryFill,
    })
  );
};

export const Square16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Square16FilledIcon,
  "Square16Filled"
);

const Warning12FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M5.21 1.46a.9.9 0 0 1 1.58 0l4.09 7.17a.92.92 0 0 1-.79 1.37H1.91a.92.92 0 0 1-.79-1.37l4.1-7.17ZM5.5 4.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0ZM6 6.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z",
      fill: primaryFill,
    })
  );
};

export const Warning12Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Warning12FilledIcon,
  "Warning12Filled"
);

const Code16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M9.8 3.04c.26.12.37.41.26.66l-4 9a.5.5 0 0 1-.92-.4l4-9a.5.5 0 0 1 .66-.26ZM4.33 5.38c.2.18.23.5.04.7L2.67 8l1.7 1.92a.5.5 0 1 1-.74.66l-2-2.25a.5.5 0 0 1 0-.66l2-2.25a.5.5 0 0 1 .7-.04Zm7.34 0a.5.5 0 0 1 .7.04l2 2.25a.5.5 0 0 1 0 .66l-2 2.25a.5.5 0 1 1-.74-.66L13.33 8l-1.7-1.92a.5.5 0 0 1 .04-.7Z",
      fill: primaryFill,
    })
  );
};

export const Code16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Code16RegularIcon,
  "Code16Regular"
);

const Desktop16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4 2a2 2 0 0 0-2 2v6c0 1.1.9 2 2 2h2v1H4.5a.5.5 0 0 0 0 1h7a.5.5 0 1 0 0-1H10v-1h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm5 10v1H7v-1h2ZM3 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Z",
      fill: primaryFill,
    })
  );
};

export const Desktop16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Desktop16RegularIcon,
  "Desktop16Regular"
);

const ColorBackground20FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "m2 10.66 1.08 1.08a3 3 0 0 0 4.24 0l.68-.68c.03 1.34.96 2.94 2.75 2.94 1.82 0 2.75-1.65 2.75-3 0-1.01-.53-1.96-.86-2.47-.2-.3-.38-.55-.52-.72l-.01-.02-.22-.26-.02-.03a1.5 1.5 0 0 0-.85-.48 3 3 0 0 0-.87-2.35L9.48 4h6.02A2.5 2.5 0 0 1 18 6.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 13.5v-2.84ZM5 1.5a.5.5 0 0 1 1 0v1.17a2 2 0 0 1 1.32.59l2.12 2.12a2 2 0 0 1 0 2.83l-2.83 2.83a2 2 0 0 1-2.82 0L1.66 8.9a2 2 0 0 1 0-2.82L4.5 3.26A2 2 0 0 1 5 2.89V1.5Zm0 4V4.16L2.66 6.5h6.32a1 1 0 0 0-.25-.41L6.61 3.96A1 1 0 0 0 6 3.68V5.5a.5.5 0 0 1-1 0Zm-2.92 2c0 .26.1.51.3.7l2.11 2.13a1 1 0 0 0 1.42 0L8.73 7.5H2.08Zm8.3.67-.22.26c-.12.15-.29.38-.46.64C9.4 9.57 9 10.3 9 11c0 1 .67 2 1.75 2s1.75-1 1.75-2c0-.7-.39-1.44-.7-1.93a8.13 8.13 0 0 0-.46-.64l-.22-.26a.5.5 0 0 0-.74 0Zm.17 1.44c.06-.11.13-.21.2-.3l.2.3c.31.47.55 1 .55 1.39 0 .3-.1.57-.25.75a.62.62 0 0 1-.5.25.62.62 0 0 1-.5-.25A1.21 1.21 0 0 1 10 11c0-.4.24-.92.55-1.4Z",
      fill: primaryFill,
    })
  );
};

export const ColorBackground20Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ColorBackground20FilledIcon,
  "ColorBackground20Filled"
);

const TextBold16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4 3.1C4 2.5 4.5 2 5.1 2h3c2.1 0 3.4 1.4 3.4 3.4 0 .9-.3 2-.7 2.6.8.6 1.4 1.2 1.4 2.5 0 2.7-2.1 3.5-3.6 3.5H5.1c-.6 0-1.1-.5-1.1-1.1V3.1ZM6 9v3h2.4c.7 0 1.5-.5 1.5-1.5S9.1 9 8.4 9H6Zm0-2h2.2c.9 0 1.5-.7 1.5-1.5S9.1 4 8.3 4H6v3Z",
      fill: primaryFill,
    })
  );
};

export const TextBold16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextBold16RegularIcon,
  "TextBold16Regular"
);

const TextBulletListLtr16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 4.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm1 3.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5.5 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9ZM5 8c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 5 8Zm.5 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9Z",
      fill: primaryFill,
    })
  );
};

export const TextBulletListLtr16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextBulletListLtr16RegularIcon,
  "TextBulletListLtr16Regular"
);

const TextColor20FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M13 2.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-3h1.5a.5.5 0 0 0 0-1H13v-3ZM5.5 3a.5.5 0 0 0 0 1H9c-.02.58-.1 1.14-.43 1.71-.43.73-1.31 1.55-3.26 2.33a.5.5 0 1 0 .38.92c2.05-.82 3.17-1.75 3.74-2.75.57-.98.57-1.94.57-2.68V3.5a.5.5 0 0 0-.5-.5h-4ZM3 13.5c0-.83.67-1.5 1.5-1.5h11c.83 0 1.5.67 1.5 1.5v3c0 .83-.67 1.5-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-3Z",
      fill: primaryFill,
    })
  );
};

export const TextColor20Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextColor20FilledIcon,
  "TextColor20Filled"
);

const TextItalic16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M13 2H7a.5.5 0 0 0 0 1h2.47L5.66 13H3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H6.73l3.81-10H13a.5.5 0 0 0 0-1Z",
      fill: primaryFill,
    })
  );
};

export const TextItalic16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextItalic16RegularIcon,
  "TextItalic16Regular"
);

const TextNumberListLtr16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3.68 1.01c.2.04.33.21.33.4v3.3c0 .22-.19.4-.42.4a.42.42 0 0 1-.43-.4V2.58c-.19.16-.4.31-.67.44a.44.44 0 0 1-.57-.19.4.4 0 0 1 .2-.55A2.5 2.5 0 0 0 3.2 1.23c.1-.17.29-.26.48-.22ZM2.15 7.06a.4.4 0 0 1 0-.59h.01a1.12 1.12 0 0 1 .11-.1l.28-.17c.24-.13.6-.26 1.03-.26h.01c.32 0 .67.09.95.29.3.2.48.53.48.95 0 .45-.2.76-.48.99-.22.17-.5.3-.72.4l-.1.06c-.27.12-.47.24-.61.39a.76.76 0 0 0-.15.22H4.6c.23 0 .42.18.42.4 0 .23-.19.42-.42.42H2.46a.42.42 0 0 1-.43-.41c0-.51.17-.9.44-1.19.26-.27.6-.44.87-.57l.12-.06c.23-.11.4-.19.53-.3.12-.1.18-.19.18-.35 0-.15-.06-.23-.14-.3a.82.82 0 0 0-.45-.12 1.32 1.32 0 0 0-.82.3.44.44 0 0 1-.6 0Zm.94 5.88c0-.23.2-.41.43-.41.3 0 .46-.08.54-.15a.3.3 0 0 0 .1-.25c0-.16-.15-.42-.64-.42-.35 0-.53.08-.62.13a.35.35 0 0 0-.07.07v-.02.02a.44.44 0 0 1-.57.16.4.4 0 0 1-.19-.55l.01-.02a.71.71 0 0 1 .09-.12c.06-.07.14-.15.26-.22.24-.16.59-.28 1.1-.28.87 0 1.47.56 1.5 1.22 0 .3-.1.6-.35.84.24.23.36.54.34.84C5 14.44 4.4 15 3.52 15c-.5 0-.85-.12-1.1-.28a1.2 1.2 0 0 1-.34-.34v-.01h-.01a.4.4 0 0 1 .2-.56c.2-.1.44-.03.55.16l.08.07c.09.05.27.14.62.14.49 0 .64-.27.65-.43a.3.3 0 0 0-.11-.25c-.08-.07-.25-.15-.54-.15a.42.42 0 0 1-.43-.4ZM7.5 3a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Zm0 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1h-6Z",
      fill: primaryFill,
    })
  );
};

export const TextNumberListLtr16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextNumberListLtr16RegularIcon,
  "TextNumberListLtr16Regular"
);

const TextStrikethrough16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M5 5.1c0-.55.3-1.06.84-1.46C6.39 3.25 7.19 3 8.1 3c1.3 0 2.38.56 2.76 1.24a.5.5 0 0 0 .88-.48C11.12 2.64 9.6 2 8.1 2c-1.09 0-2.1.3-2.84.83A2.78 2.78 0 0 0 4 5.1c0 .72.3 1.37.79 1.9H6.5C5.55 6.6 5 5.83 5 5.1ZM13.5 8a.5.5 0 0 1 0 1h-2.34c.52.5.84 1.15.84 1.9 0 .9-.51 1.69-1.26 2.23C10 13.67 9 14 7.9 14c-1.62 0-3-.65-3.72-1.72a.5.5 0 0 1 .84-.56C5.5 12.45 6.52 13 7.9 13c.9 0 1.7-.27 2.25-.68.56-.4.85-.92.85-1.42 0-.78-.63-1.53-1.78-1.9H2.5a.5.5 0 0 1 0-1h11Z",
      fill: primaryFill,
    })
  );
};

export const TextStrikethrough16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextStrikethrough16RegularIcon,
  "TextStrikethrough16Regular"
);

const TextSubscript16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2.17 3.13a.5.5 0 0 1 .7.04L6.5 7.25l3.63-4.08a.5.5 0 0 1 .74.66L7.17 8l2.85 3.2-.02.3c0 .47.22.9.56 1.17-.07.1-.13.2-.18.31a.5.5 0 0 1-.25-.15L6.5 8.75l-3.63 4.08a.5.5 0 1 1-.74-.66L5.83 8l-3.7-4.17a.5.5 0 0 1 .04-.7ZM12 11.5a.5.5 0 0 1 1 0c0 .26-.08.4-.19.5-.1.1-.2.17-.35.26l-.24.15C11.36 13 11 13.77 11 14.5c0 .28.22.5.5.5h2a.5.5 0 0 0 0-1h-1.4c.12-.25.32-.52.68-.76l.13-.08c.17-.11.42-.27.6-.45.29-.29.49-.67.49-1.21a1.5 1.5 0 0 0-3 0 .5.5 0 0 0 1 0Z",
      fill: primaryFill,
    })
  );
};

export const TextSubscript16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextSubscript16RegularIcon,
  "TextSubscript16Regular"
);

const TextSuperscript16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M12 2.5a.5.5 0 0 1 1 0c0 .26-.08.4-.19.5-.1.1-.2.17-.35.26l-.24.15C11.36 4 11 4.77 11 5.5c0 .28.22.5.5.5h2a.5.5 0 0 0 0-1h-1.4a1.8 1.8 0 0 1 .81-.84c.17-.11.42-.27.6-.45.29-.29.49-.67.49-1.21a1.5 1.5 0 0 0-3 0 .5.5 0 0 0 1 0Zm-2 2c0-.5.12-1.01.36-1.48a.5.5 0 0 0-.23.15L6.5 7.25 2.87 3.17a.5.5 0 0 0-.74.66L5.83 8l-3.7 4.17a.5.5 0 0 0 .74.66L6.5 8.75l3.63 4.08a.5.5 0 1 0 .74-.66L7.17 8l2.86-3.22A1.5 1.5 0 0 1 10 4.5Z",
      fill: primaryFill,
    })
  );
};

export const TextSuperscript16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextSuperscript16RegularIcon,
  "TextSuperscript16Regular"
);

const TextUnderline16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4.5 2c.28 0 .5.22.5.5V8c0 1.62 1.38 3 3 3s3-1.38 3-3V2.5a.5.5 0 0 1 1 0V8c0 2.18-1.82 4-4 4-2.18 0-4-1.82-4-4V2.5c0-.28.22-.5.5-.5ZM4 13.5c0-.28.22-.5.5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const TextUnderline16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextUnderline16RegularIcon,
  "TextUnderline16Regular"
);

const TextClearFormatting16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4.5 1c.2 0 .38.12.46.3l2.88 6.73-.75.76a.5.5 0 0 1-.05-.1L6.31 7H2.7l-.73 1.7a.5.5 0 0 1-.92-.4l3-7A.5.5 0 0 1 4.5 1Zm1.38 5L4.5 2.77 3.12 6h2.76Zm8.43.2V6c0-1.82-.95-3-2.42-3a2 2 0 0 0-1.82 1.02H10V1.5a.5.5 0 1 0-1 0v5.38l1-1v-.4c.15-1.03.76-1.65 1.67-1.65.86 0 1.43.53 1.62 1.44.17.1.33.23.48.38l.54.54ZM9.51 15a1.5 1.5 0 0 1-1.57-.35l-1.59-1.59a1.5 1.5 0 0 1 0-2.12l4.59-4.59a1.5 1.5 0 0 1 2.12 0l1.59 1.59a1.5 1.5 0 0 1 0 2.12l-3.29 3.29-.01.01-.64.64h1.79a.5.5 0 0 1 0 1h-3Zm.78-2L8 10.7l-.94.95a.5.5 0 0 0 0 .7l1.59 1.59c.2.2.5.2.7 0l.94-.94Zm.71-.7 2.94-2.95a.5.5 0 0 0 0-.7l-1.59-1.59a.5.5 0 0 0-.7 0L8.7 10 11 12.3Z",
      fill: primaryFill,
    })
  );
};

export const TextClearFormatting16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextClearFormatting16RegularIcon,
  "TextClearFormatting16Regular"
);

const ContentSettings16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v1.76a5.5 5.5 0 0 0-1-.66V5H3v6.5c0 .83.67 1.5 1.5 1.5h1.1c.19.36.4.7.66 1H4.5A2.5 2.5 0 0 1 2 11.5v-7ZM3.09 4h9.83c-.2-.58-.76-1-1.42-1h-7c-.65 0-1.2.42-1.41 1ZM4.5 6h2.83c-.4.28-.77.62-1.08 1H5v3.28a5.6 5.6 0 0 0 0 .44V11h.01c.03.34.1.68.19 1h-.7a.5.5 0 0 1-.5-.5v-5c0-.28.22-.5.5-.5Zm2 2.72.35.35a2 2 0 0 1 0 2.86l-.35.35c.13.31.29.6.48.87l.4-.11a2 2 0 0 1 2.52 1.45l.11.48a4.26 4.26 0 0 0 .96 0l.12-.48a2 2 0 0 1 2.52-1.45l.4.11c.19-.27.35-.56.48-.87l-.36-.35a2 2 0 0 1 0-2.86l.36-.35c-.13-.31-.3-.6-.48-.87l-.4.11a2 2 0 0 1-2.52-1.45l-.12-.48a4.25 4.25 0 0 0-.96 0l-.11.48a2 2 0 0 1-2.52 1.45l-.4-.11c-.2.27-.35.56-.48.87Zm4 2.78a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
      fill: primaryFill,
    })
  );
};

export const ContentSettings16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ContentSettings16RegularIcon,
  "ContentSettings16Regular"
);

const Globe16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M6 8c0-.7.04-1.38.12-2h3.76a15.73 15.73 0 0 1 0 4H6.12C6.04 9.38 6 8.7 6 8Zm-.88 2a16.83 16.83 0 0 1 0-4H2.34a5.99 5.99 0 0 0 0 4h2.78ZM2.8 11h2.47c.13.66.3 1.25.5 1.78.13.35.28.67.45.95A6.02 6.02 0 0 1 2.8 11Zm3.5 0h3.4c-.1.53-.24 1-.4 1.42-.21.55-.45.97-.7 1.23-.24.27-.44.35-.6.35-.16 0-.36-.08-.6-.35a3.99 3.99 0 0 1-.7-1.23c-.16-.42-.3-.9-.4-1.42Zm4.43 0c-.13.66-.3 1.25-.5 1.78-.13.35-.28.67-.45.95A6.02 6.02 0 0 0 13.2 11h-2.47Zm2.93-1a5.99 5.99 0 0 0 0-4h-2.78a16.82 16.82 0 0 1 0 4h2.78ZM9.3 3.58c.16.42.3.9.4 1.42H6.3c.1-.53.24-1 .4-1.42.21-.55.45-.97.7-1.23.24-.27.44-.35.6-.35.16 0 .36.08.6.35.25.26.49.68.7 1.23ZM10.73 5h2.47a6.02 6.02 0 0 0-3.42-2.73c.17.28.32.6.45.95.2.53.37 1.12.5 1.78ZM2.8 5h2.47c.13-.66.3-1.25.5-1.78.13-.34.28-.67.45-.95A6.02 6.02 0 0 0 2.8 5Z",
      fill: primaryFill,
    })
  );
};

export const Globe16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Globe16FilledIcon,
  "Globe16Filled"
);

const LockClosed16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7.83 1.76 8 1.75a2.75 2.75 0 0 1 2.74 2.58l.01.17V5h.75c.83 0 1.5.67 1.5 1.5v6c0 .83-.67 1.5-1.5 1.5h-7A1.5 1.5 0 0 1 3 12.5v-6C3 5.67 3.67 5 4.5 5h.75v-.5a2.75 2.75 0 0 1 2.58-2.74L8 1.75h-.17ZM8 8.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm.13-5.24L8 3.25c-.65 0-1.18.5-1.24 1.12l-.01.13V5h2.5v-.5c0-.65-.5-1.18-1.12-1.24L8 3.25h.13Z",
      fill: primaryFill,
    })
  );
};

export const LockClosed16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ LockClosed16FilledIcon,
  "LockClosed16Filled"
);

const CopyAdd20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h1.2c-.08-.32-.15-.66-.18-1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5.02c.34.03.68.1 1 .19V4a2 2 0 0 0-2-2H8Zm-.5 15h2.1c.18.36.4.7.66 1H7.5A3.5 3.5 0 0 1 4 14.5V6a2 2 0 0 1 1-1.73V14.5A2.5 2.5 0 0 0 7.5 17ZM19 14.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-4-2a.5.5 0 0 0-1 0V14h-1.5a.5.5 0 0 0 0 1H14v1.5a.5.5 0 0 0 1 0V15h1.5a.5.5 0 0 0 0-1H15v-1.5Z",
      fill: primaryFill,
    })
  );
};

export const CopyAdd20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ CopyAdd20RegularIcon,
  "CopyAdd20Regular"
);

const CursorClick20FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7.5 2c.28 0 .5.22.5.5v2a.5.5 0 0 1-1 0v-2c0-.28.22-.5.5-.5ZM3.61 3.61c.2-.2.51-.2.7 0l1.42 1.42a.5.5 0 1 1-.7.7L3.6 4.32a.5.5 0 0 1 0-.7Zm7.78 0c.2.2.2.51 0 .7L9.97 5.74a.5.5 0 1 1-.7-.7l1.41-1.42c.2-.2.51-.2.7 0ZM2 7.5c0-.28.22-.5.5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5Zm5.5.53v9.26c0 .45.54.67.85.36l2.56-2.56a2 2 0 0 1 1.42-.59h3.23a.5.5 0 0 0 .31-.9L8.31 7.65a.5.5 0 0 0-.81.4Z",
      fill: primaryFill,
    })
  );
};

export const CursorClick20Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ CursorClick20FilledIcon,
  "CursorClick20Filled"
);

const DocumentText16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3 3c0-1.1.9-2 2-2h3.59c.4 0 .78.16 1.06.44l2.91 2.91c.28.28.44.67.44 1.06V13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3Zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V6H9.5A1.5 1.5 0 0 1 8 4.5V2H5Zm4.5 3h2.3L9 2.2v2.3c0 .28.22.5.5.5Zm-4 3a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5ZM5 10.5c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm.5 1.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5Z",
      fill: primaryFill,
    })
  );
};

export const DocumentText16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ DocumentText16RegularIcon,
  "DocumentText16Regular"
);

const Edit16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M13.44 2.56a1.91 1.91 0 0 0-2.7 0l-7.4 7.4c-.18.18-.32.4-.4.64l-.91 2.74a.5.5 0 0 0 .63.63l2.74-.91c.24-.08.46-.22.65-.4l7.39-7.4c.75-.74.75-1.95 0-2.7Zm-2 .7a.91.91 0 1 1 1.3 1.3L12 5.3 10.7 4l.74-.73ZM10 4.72 11.3 6l-5.96 5.94a.65.65 0 0 1-.26.16l-1.79.6.6-1.8c.03-.09.08-.18.16-.25L10 4.71Z",
      fill: primaryFill,
    })
  );
};

export const Edit16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Edit16RegularIcon,
  "Edit16Regular"
);

const SlideLink20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 6c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v4.84a3.47 3.47 0 0 0-1-.3V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5.14c.11.36.28.7.49 1H4a2 2 0 0 1-2-2V6Zm10.5 5.5a2.5 2.5 0 0 0 0 5h.5a.5.5 0 0 0 0-1h-.5a1.5 1.5 0 0 1 0-3h.5a.5.5 0 0 0 0-1h-.5Zm3.5 0a.5.5 0 0 0 0 1h.5a1.5 1.5 0 0 1 0 3H16a.5.5 0 0 0 0 1h.5a2.5 2.5 0 0 0 0-5H16ZM12 14c0-.28.22-.5.5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const SlideLink20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ SlideLink20RegularIcon,
  "SlideLink20Regular"
);

const Checkmark24FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "m8.5 16.59-3.8-3.8a1 1 0 0 0-1.4 1.42l4.5 4.5a1 1 0 0 0 1.4 0l11-11a1 1 0 0 0-1.4-1.42L8.5 16.6Z",
      fill: primaryFill,
    })
  );
};

export const Checkmark24Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Checkmark24FilledIcon,
  "Checkmark24Filled"
);

const Save16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1V9.5C4 8.67 4.67 8 5.5 8h5c.83 0 1.5.67 1.5 1.5V13a1 1 0 0 0 1-1V5.62a1 1 0 0 0-.3-.7L11.1 3.28a1 1 0 0 0-.71-.29H10v1.5C10 5.33 9.33 6 8.5 6h-2A1.5 1.5 0 0 1 5 4.5V3H4Zm2 0v1.5c0 .28.22.5.5.5h2a.5.5 0 0 0 .5-.5V3H6Zm5 10V9.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0-.5.5V13h6ZM2 4c0-1.1.9-2 2-2h6.38a2 2 0 0 1 1.41.59l1.62 1.62A2 2 0 0 1 14 5.62V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Z",
      fill: primaryFill,
    })
  );
};

export const Save16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Save16RegularIcon,
  "Save16Regular"
);

const Desktop20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4 2a2 2 0 0 0-2 2v9c0 1.1.9 2 2 2h3v2H5.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1H13v-2h3a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4Zm8 13v2H8v-2h4ZM3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4Z",
      fill: primaryFill,
    })
  );
};

export const Desktop20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Desktop20RegularIcon,
  "Desktop20Regular"
);

const Phone20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M9 14a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H9ZM7 2a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H7ZM6 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4Z",
      fill: primaryFill,
    })
  );
};

export const Phone20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Phone20RegularIcon,
  "Phone20Regular"
);

const GlobeRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-15c.66 0 1.4.59 2.02 1.9.22.47.4 1.01.56 1.6H7.42c.15-.59.34-1.13.56-1.6C8.59 3.6 9.34 3 10 3ZM7.07 4.49c-.27.59-.5 1.27-.68 2.01H3.94A7.02 7.02 0 0 1 7.7 3.38c-.24.33-.45.7-.64 1.1ZM6.2 7.5a15.97 15.97 0 0 0 0 5H3.46a6.98 6.98 0 0 1 0-5h2.73Zm.2 6c.17.74.4 1.42.68 2.01.19.4.4.78.64 1.1a7.02 7.02 0 0 1-3.77-3.11h2.45Zm1.03 0h5.16a9.25 9.25 0 0 1-.56 1.6C11.41 16.4 10.66 17 10 17c-.66 0-1.4-.59-2.02-1.9-.22-.47-.4-1.01-.56-1.6Zm5.37-1H7.21a14.87 14.87 0 0 1 0-5h5.58a14.86 14.86 0 0 1 0 5Zm.82 1h2.45a7.02 7.02 0 0 1-3.77 3.12c.24-.33.45-.7.64-1.1.27-.6.5-1.28.68-2.02Zm2.93-1h-2.73a15.97 15.97 0 0 0 0-5h2.73a6.98 6.98 0 0 1 0 5Zm-4.25-9.12a7.02 7.02 0 0 1 3.77 3.12h-2.45a10.5 10.5 0 0 0-.68-2.01c-.19-.4-.4-.78-.64-1.1Z",
      fill: primaryFill,
    })
  );
};

export const GlobeRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ GlobeRegularIcon,
  "GlobeRegular"
);

const PanelLeft20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V6Zm6.5-2v11H15a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H8.5Zm-1 0H5a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2h2.5V4Z",
      fill: primaryFill,
    })
  );
};

export const PanelLeft20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ PanelLeft20RegularIcon,
  "PanelLeft20Regular"
);

const PanelLeftContract20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M10.82 10.5h3.68a.5.5 0 0 0 0-1h-3.68l1-.87a.5.5 0 1 0-.66-.76l-2 1.75a.5.5 0 0 0 0 .76l2 1.75a.5.5 0 1 0 .66-.76l-1-.87ZM4 4a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4ZM3 6a1 1 0 0 1 1-1h3v10H4a1 1 0 0 1-1-1V6Zm5 9V5h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8Z",
      fill: primaryFill,
    })
  );
};

export const PanelLeftContract20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ PanelLeftContract20RegularIcon,
  "PanelLeftContract20Regular"
);

const PanelRight20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M18 6a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V6Zm-6.5-2v11H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6.5Zm1 0H15a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2.5V4Z",
      fill: primaryFill,
    })
  );
};

export const PanelRight20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ PanelRight20RegularIcon,
  "PanelRight20Regular"
);

const PanelRightContract20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "m9.18 10.5-1 .87a.5.5 0 1 0 .66.76l2-1.75a.5.5 0 0 0 0-.76l-2-1.75a.5.5 0 1 0-.66.76l1 .87H5.5a.5.5 0 0 0 0 1h3.68ZM16 16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h12Zm1-2a1 1 0 0 1-1 1h-3V5h3a1 1 0 0 1 1 1v8Zm-5-9v10H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h8Z",
      fill: primaryFill,
    })
  );
};

export const PanelRightContract20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ PanelRightContract20RegularIcon,
  "PanelRightContract20Regular"
);

const Phone16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7 12a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1H7ZM5.75 1C4.78 1 4 1.78 4 2.75v10.5c0 .97.78 1.75 1.75 1.75h4.5c.97 0 1.75-.78 1.75-1.75V2.75C12 1.78 11.22 1 10.25 1h-4.5ZM5 2.75c0-.41.34-.75.75-.75h4.5c.41 0 .75.34.75.75v10.5c0 .41-.34.75-.75.75h-4.5a.75.75 0 0 1-.75-.75V2.75Z",
      fill: primaryFill,
    })
  );
};

export const Phone16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Phone16RegularIcon,
  "Phone16Regular"
);

const Copy16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4 4.09v6.41A2.5 2.5 0 0 0 6.34 13h4.57c-.2.58-.76 1-1.41 1H6a3 3 0 0 1-3-3V5.5c0-.65.42-1.2 1-1.41ZM11.5 2c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5h-5A1.5 1.5 0 0 1 5 10.5v-7C5 2.67 5.67 2 6.5 2h5Zm0 1h-5a.5.5 0 0 0-.5.5v7c0 .28.22.5.5.5h5a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const Copy16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Copy16RegularIcon,
  "Copy16Regular"
);

const Delete16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7 3h2a1 1 0 0 0-2 0ZM6 3a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.56l-1.2 8.84A2.5 2.5 0 0 1 9.74 15h-3.5a2.5 2.5 0 0 1-2.48-2.16L2.57 4H2a.5.5 0 0 1 0-1h4Zm1 3.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0v-5ZM9.5 6c.28 0 .5.22.5.5v5a.5.5 0 0 1-1 0v-5c0-.28.22-.5.5-.5Zm-4.74 6.7c.1.75.74 1.3 1.49 1.3h3.5a1.5 1.5 0 0 0 1.5-1.3L12.42 4H3.57l1.19 8.7Z",
      fill: primaryFill,
    })
  );
};

export const Delete16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Delete16RegularIcon,
  "Delete16Regular"
);

const BookOpen16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2.5 2C1.67 2 1 2.67 1 3.5v9c0 .83.67 1.5 1.5 1.5H6c.82 0 1.54-.4 2-1 .46.6 1.18 1 2 1h3.5c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5H10c-.82 0-1.54.4-2 1a2.5 2.5 0 0 0-2-1H2.5Zm5 2.5v7c0 .83-.67 1.5-1.5 1.5H2.5a.5.5 0 0 1-.5-.5v-9c0-.28.22-.5.5-.5H6c.83 0 1.5.67 1.5 1.5Zm1 7v-7c0-.83.67-1.5 1.5-1.5h3.5c.28 0 .5.22.5.5v9a.5.5 0 0 1-.5.5H10a1.5 1.5 0 0 1-1.5-1.5Z",
      fill: primaryFill,
    })
  );
};

export const BookOpen16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ BookOpen16RegularIcon,
  "BookOpen16Regular"
);

const Image16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M11.5 5.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5v-7ZM4.5 3C3.67 3 3 3.67 3 4.5v7c0 .23.05.45.15.65L6.8 8.49a1.7 1.7 0 0 1 2.4 0l3.65 3.66c.1-.2.15-.42.15-.65v-7c0-.83-.67-1.5-1.5-1.5h-7Zm7.65 9.85L8.5 9.2a.7.7 0 0 0-1 0l-3.65 3.65c.2.1.42.15.65.15h7c.23 0 .45-.05.65-.15Z",
      fill: primaryFill,
    })
  );
};

export const Image16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Image16RegularIcon,
  "Image16Regular"
);

const RectangleLandscape16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5v-5ZM3.5 4C2.67 4 2 4.67 2 5.5v5c0 .83.67 1.5 1.5 1.5h9c.83 0 1.5-.67 1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5h-9Z",
      fill: primaryFill,
    })
  );
};

export const RectangleLandscape16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ RectangleLandscape16RegularIcon,
  "RectangleLandscape16Regular"
);

const DocumentPdfRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M6.5 11a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-.17h.33a1.17 1.17 0 0 0 0-2.33H6.5Zm.83 1.33H7V12h.33a.17.17 0 0 1 0 .33ZM12 11.5c0-.28.23-.5.5-.5h1a.5.5 0 0 1 0 1H13v.33h.5a.5.5 0 1 1 0 1H13v.17a.5.5 0 0 1-1 0v-2ZM9.5 11a.5.5 0 0 0-.5.5v2c0 .28.22.5.5.5h.5a1.5 1.5 0 0 0 0-3h-.5Zm.5 2v-1a.5.5 0 0 1 0 1ZM4 4c0-1.1.9-2 2-2h4.59c.4 0 .78.16 1.06.44l3.91 3.91c.28.28.44.67.44 1.06v1.67c.58.2 1 .76 1 1.42v4c0 .65-.42 1.2-1 1.41V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.09c-.58-.2-1-.76-1-1.41v-4c0-.66.42-1.21 1-1.42V4Zm11 4h-3.5A1.5 1.5 0 0 1 10 6.5V3H6a1 1 0 0 0-1 1v5h10V8ZM5 16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1H5Zm6-12.8v3.3c0 .28.22.5.5.5h3.3L11 3.2ZM4.5 10a.5.5 0 0 0-.5.5v4c0 .28.23.5.5.5h11a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5h-11Z",
      fill: primaryFill,
    })
  );
};

export const DocumentPdfRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ DocumentPdfRegularIcon,
  "DocumentPdfRegular"
);

const DocumentPdf24RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7.5 13a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0V16h.5a1.5 1.5 0 0 0 0-3h-1Zm1 2H8v-1h.5a.5.5 0 1 1 0 1Zm6.5-1.5c0-.27.22-.5.5-.5H17a.5.5 0 1 1 0 1h-1v1h1a.5.5 0 0 1 0 1h-1v.5a.5.5 0 0 1-1 0v-3Zm-3.5-.5a.5.5 0 0 0-.5.5v3c0 .28.22.5.5.5h.5a2 2 0 0 0 0-4h-.5Zm.5 3v-2a1 1 0 0 1 0 2Zm8 4v-1.16c.6-.29 1-.89 1-1.59v-4.5c0-.7-.4-1.3-1-1.58V9.83a2 2 0 0 0-.59-1.42L13.6 2.6a.5.5 0 0 0-.05-.04 2.07 2.07 0 0 0-.34-.25l-.05-.03-.05-.03-.16-.09c-.2-.08-.41-.12-.63-.14h-.06a.6.6 0 0 0-.08-.01H6a2 2 0 0 0-2 2v7.17c-.6.28-1 .88-1 1.58v4.5c0 .7.4 1.3 1 1.59V20c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2Zm-2 .5H6a.5.5 0 0 1-.5-.5v-1h13v1a.5.5 0 0 1-.5.5Zm.5-10.5v1h-13V4c0-.27.22-.5.5-.5h6V8c0 1.1.9 2 2 2h4.5Zm-1.12-1.5H14a.5.5 0 0 1-.5-.5V4.62l3.88 3.88Zm-12.63 4h14.5c.14 0 .25.11.25.25v4.5c0 .14-.11.25-.25.25H4.75a.25.25 0 0 1-.25-.25v-4.5c0-.14.11-.25.25-.25Z",
      fill: primaryFill,
    })
  );
};

export const DocumentPdf24Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ DocumentPdf24RegularIcon,
  "DocumentPdf24Regular"
);

const Delete12RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M5 3h2a1 1 0 0 0-2 0ZM4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.44l-.44 5.17a2 2 0 0 1-2 1.83H4.38a2 2 0 0 1-2-1.83L1.94 4H1.5a.5.5 0 0 1 0-1H4Zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0V6ZM5 5.5c.28 0 .5.22.5.5v2a.5.5 0 0 1-1 0V6c0-.28.22-.5.5-.5ZM3.38 9.09a1 1 0 0 0 1 .91h3.24a1 1 0 0 0 1-.91L9.06 4H2.94l.44 5.09Z",
      fill: primaryFill,
    })
  );
};

export const Delete12Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Delete12RegularIcon,
  "Delete12Regular"
);

const AlignCenterVertical16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8.5 15a.5.5 0 0 1-.5-.5V14H6.75C5.78 14 5 13.22 5 12.25v-1.5C5 9.78 5.78 9 6.75 9H8V7H5.75C4.78 7 4 6.22 4 5.25v-1.5C4 2.78 4.78 2 5.75 2H8v-.5a.5.5 0 0 1 1 0V2h2.25c.97 0 1.75.78 1.75 1.75v1.5C13 6.22 12.22 7 11.25 7H9v2h1.25c.97 0 1.75.78 1.75 1.75v1.5c0 .97-.78 1.75-1.75 1.75H9v.5a.5.5 0 0 1-.5.5ZM5.75 3a.75.75 0 0 0-.75.75v1.5c0 .41.34.75.75.75h5.5c.41 0 .75-.34.75-.75v-1.5a.75.75 0 0 0-.75-.75h-5.5Zm1 7a.75.75 0 0 0-.75.75v1.5c0 .41.34.75.75.75h3.5c.41 0 .75-.34.75-.75v-1.5a.75.75 0 0 0-.75-.75h-3.5Z",
      fill: primaryFill,
    })
  );
};

export const AlignCenterVertical16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ AlignCenterVertical16RegularIcon,
  "AlignCenterVertical16Regular"
);

const AlignLeft16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 1.5a.5.5 0 0 1 1 0v13a.5.5 0 0 1-1 0v-13Zm3.75.5C4.78 2 4 2.78 4 3.75v1.5C4 6.22 4.78 7 5.75 7h6.5C13.22 7 14 6.22 14 5.25v-1.5C14 2.78 13.22 2 12.25 2h-6.5ZM5 3.75c0-.41.34-.75.75-.75h6.5c.41 0 .75.34.75.75v1.5c0 .41-.34.75-.75.75h-6.5A.75.75 0 0 1 5 5.25v-1.5ZM5.75 9C4.78 9 4 9.78 4 10.75v1.5c0 .97.78 1.75 1.75 1.75h4.5c.97 0 1.75-.78 1.75-1.75v-1.5C12 9.78 11.22 9 10.25 9h-4.5ZM5 10.75c0-.41.34-.75.75-.75h4.5c.41 0 .75.34.75.75v1.5c0 .41-.34.75-.75.75h-4.5a.75.75 0 0 1-.75-.75v-1.5Z",
      fill: primaryFill,
    })
  );
};

export const AlignLeft16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ AlignLeft16RegularIcon,
  "AlignLeft16Regular"
);

const AlignRight16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M14 1.5a.5.5 0 0 0-1 0v13a.5.5 0 0 0 1 0v-13Zm-3.75.5c.97 0 1.75.78 1.75 1.75v1.5C12 6.22 11.22 7 10.25 7h-6.5C2.78 7 2 6.22 2 5.25v-1.5C2 2.78 2.78 2 3.75 2h6.5ZM11 3.75a.75.75 0 0 0-.75-.75h-6.5a.75.75 0 0 0-.75.75v1.5c0 .41.34.75.75.75h6.5c.41 0 .75-.34.75-.75v-1.5ZM10.25 9c.97 0 1.75.78 1.75 1.75v1.5c0 .97-.78 1.75-1.75 1.75h-4.5C4.78 14 4 13.22 4 12.25v-1.5C4 9.78 4.78 9 5.75 9h4.5Zm.75 1.75a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0-.75.75v1.5c0 .41.34.75.75.75h4.5c.41 0 .75-.34.75-.75v-1.5Z",
      fill: primaryFill,
    })
  );
};

export const AlignRight16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ AlignRight16RegularIcon,
  "AlignRight16Regular"
);

const TextAlignCenter16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3 3.5c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-2 4c0-.28.22-.5.5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5Zm4 4c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const TextAlignCenter16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextAlignCenter16RegularIcon,
  "TextAlignCenter16Regular"
);

const TextAlignJustify20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 4.5c0-.28.22-.5.5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5Zm0 5c0-.28.22-.5.5-.5h15a.5.5 0 0 1 0 1h-15a.5.5 0 0 1-.5-.5Zm.5 4.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-15Z",
      fill: primaryFill,
    })
  );
};

export const TextAlignJustify20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextAlignJustify20RegularIcon,
  "TextAlignJustify20Regular"
);

const TextAlignLeft16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M1 3.5c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm0 4c0-.28.22-.5.5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5Zm0 4c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const TextAlignLeft16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextAlignLeft16RegularIcon,
  "TextAlignLeft16Regular"
);

const TextAlignRight16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M5 3.5c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm-4 4c0-.28.22-.5.5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5Zm8 4c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const TextAlignRight16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextAlignRight16RegularIcon,
  "TextAlignRight16Regular"
);

const DeleteDismissFilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M11.5 4a1.5 1.5 0 0 0-3 0h3Zm-4 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.05l-.49 4.2a5.5 5.5 0 0 0-5.7 8.8H7.73a3 3 0 0 1-2.98-2.66L3.55 5H2.5a.5.5 0 0 1 0-1h5ZM19 14.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-2.65-1.15a.5.5 0 0 0-.7-.7l-1.15 1.14-1.15-1.14a.5.5 0 0 0-.7.7l1.14 1.15-1.14 1.15a.5.5 0 0 0 .7.7l1.15-1.14 1.15 1.14a.5.5 0 0 0 .7-.7l-1.14-1.15 1.14-1.15Z",
      fill: primaryFill,
    })
  );
};

export const DeleteDismissFilled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ DeleteDismissFilledIcon,
  "DeleteDismissFilled"
);

const DeleteDismissRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M11.5 4a1.5 1.5 0 0 0-3 0h3Zm-4 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.05l-.49 4.2a5.48 5.48 0 0 0-.98-.18L15.44 5H4.56l1.18 10.23A2 2 0 0 0 7.73 17H9.6c.18.36.4.7.66 1H7.73a3 3 0 0 1-2.98-2.66L3.55 5H2.5a.5.5 0 0 1 0-1h5ZM19 14.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm-2.65-1.15a.5.5 0 0 0-.7-.7l-1.15 1.14-1.15-1.14a.5.5 0 0 0-.7.7l1.14 1.15-1.14 1.15a.5.5 0 0 0 .7.7l1.15-1.14 1.15 1.14a.5.5 0 0 0 .7-.7l-1.14-1.15 1.14-1.15Z",
      fill: primaryFill,
    })
  );
};

export const DeleteDismissRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ DeleteDismissRegularIcon,
  "DeleteDismissRegular"
);

const History16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8 3.5A4.5 4.5 0 1 1 3.5 8 .75.75 0 0 0 2 8a6 6 0 1 0 2.5-4.87v-.38a.75.75 0 0 0-1.5 0v2.5c0 .41.34.75.75.75h1.5a.75.75 0 0 0 0-1.5h-.08c.77-.63 1.76-1 2.83-1Zm.5 2.25a.75.75 0 0 0-1.5 0v2.5c0 .41.34.75.75.75h1.5a.75.75 0 0 0 0-1.5H8.5V5.75Z",
      fill: primaryFill,
    })
  );
};

export const History16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ History16FilledIcon,
  "History16Filled"
);

const History24FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M19.25 12A7.25 7.25 0 0 0 7.58 6.25h.67a1 1 0 0 1 0 2h-3a1 1 0 0 1-1-1V7h-.03l.03-.05v-2.7a1 1 0 0 1 2 0v.5a9.25 9.25 0 1 1-3.43 6.12c.06-.51.51-.87 1.03-.87.6 0 1.02.57.95 1.16a7.25 7.25 0 1 0 14.45.84ZM13 8a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h3a1 1 0 1 0 0-2h-2V8Z",
      fill: primaryFill,
    })
  );
};

export const History24Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ History24FilledIcon,
  "History24Filled"
);

const ArrowDown12RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M6 1.5c.28 0 .5.22.5.5v6.8l2.65-2.65a.5.5 0 1 1 .7.7l-3.5 3.5a.5.5 0 0 1-.7 0l-3.5-3.5a.5.5 0 1 1 .7-.7L5.5 8.79V2c0-.28.22-.5.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowDown12Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowDown12RegularIcon,
  "ArrowDown12Regular"
);

const ArrowLeft12RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M10.5 6a.5.5 0 0 0-.5-.5H3.2l2.65-2.65a.5.5 0 1 0-.7-.7l-3.5 3.5a.5.5 0 0 0 0 .7l3.5 3.5a.5.5 0 0 0 .7-.7L3.21 6.5H10a.5.5 0 0 0 .5-.5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowLeft12Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowLeft12RegularIcon,
  "ArrowLeft12Regular"
);

const ArrowRight12RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M1.5 6c0-.28.22-.5.5-.5h6.8L6.14 2.85a.5.5 0 1 1 .7-.7l3.5 3.5c.2.2.2.5 0 .7l-3.5 3.5a.5.5 0 0 1-.7-.7L8.79 6.5H2a.5.5 0 0 1-.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowRight12Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowRight12RegularIcon,
  "ArrowRight12Regular"
);

const ArrowUp12RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M6 10.5a.5.5 0 0 0 .5-.5V3.2l2.65 2.65a.5.5 0 1 0 .7-.7l-3.5-3.5a.5.5 0 0 0-.7 0l-3.5 3.5a.5.5 0 1 0 .7.7L5.5 3.21V10c0 .28.22.5.5.5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowUp12Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowUp12RegularIcon,
  "ArrowUp12Regular"
);

const FullScreenMaximize16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4 3.5a.5.5 0 0 0-.5.5v1.61a.75.75 0 0 1-1.5 0V4c0-1.1.9-2 2-2h1.61a.75.75 0 0 1 0 1.5H4Zm5.64-.75c0-.41.33-.75.75-.75H12a2 2 0 0 1 2 2v1.61a.75.75 0 0 1-1.5 0V4a.5.5 0 0 0-.5-.5h-1.61a.75.75 0 0 1-.75-.75ZM2.75 9.64c.41 0 .75.33.75.75V12c0 .28.22.5.5.5h1.61a.75.75 0 0 1 0 1.5H4a2 2 0 0 1-2-2v-1.61c0-.42.34-.75.75-.75Zm10.5 0c.41 0 .75.33.75.75V12a2 2 0 0 1-2 2h-1.61a.75.75 0 1 1 0-1.5H12a.5.5 0 0 0 .5-.5v-1.61c0-.42.34-.75.75-.75Z",
      fill: primaryFill,
    })
  );
};

export const FullScreenMaximize16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ FullScreenMaximize16FilledIcon,
  "FullScreenMaximize16Filled"
);

const FullScreenMinimize16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M11.5 4c0 .28.22.5.5.5h1.75a.75.75 0 0 1 0 1.5H12a2 2 0 0 1-2-2V2.25a.75.75 0 0 1 1.5 0V4Zm0 8c0-.28.22-.5.5-.5h1.75a.75.75 0 0 0 0-1.5H12a2 2 0 0 0-2 2v1.75a.75.75 0 0 0 1.5 0V12ZM4 11.5c.28 0 .5.22.5.5v1.75a.75.75 0 0 0 1.5 0V12a2 2 0 0 0-2-2H2.25a.75.75 0 0 0 0 1.5H4ZM4.5 4a.5.5 0 0 1-.5.5H2.25a.75.75 0 0 0 0 1.5H4a2 2 0 0 0 2-2V2.25a.75.75 0 0 0-1.5 0V4Z",
      fill: primaryFill,
    })
  );
};

export const FullScreenMinimize16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ FullScreenMinimize16FilledIcon,
  "FullScreenMinimize16Filled"
);

const Delete12FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M5 3h2a1 1 0 0 0-2 0ZM4 3a2 2 0 1 1 4 0h2.5a.5.5 0 0 1 0 1h-.44l-.44 5.17a2 2 0 0 1-2 1.83H4.38a2 2 0 0 1-2-1.83L1.94 4H1.5a.5.5 0 0 1 0-1H4Zm3.5 3a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0V6ZM5 5.5a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5Z",
      fill: primaryFill,
    })
  );
};

export const Delete12Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Delete12FilledIcon,
  "Delete12Filled"
);

const SwipeRight20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M6 6a4 4 0 0 1 3.7 2.5H8.6a3 3 0 1 0 0 3h1.1A4 4 0 1 1 6 6Zm8.85 7.35 3-3a.5.5 0 0 0 0-.7l-3-3a.5.5 0 1 0-.7.7l2.14 2.15H5.5a.5.5 0 0 0 0 1h10.8l-2.15 2.15a.5.5 0 0 0 .7.7Z",
      fill: primaryFill,
    })
  );
};

export const SwipeRight20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ SwipeRight20RegularIcon,
  "SwipeRight20Regular"
);

const SwipeDown20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M14 6a4 4 0 0 1-2.5 3.7V8.6a3 3 0 1 0-3 0v1.1A4 4 0 1 1 14 6ZM9.65 17.85c.2.2.5.2.7 0l3-3a.5.5 0 0 0-.7-.7l-2.15 2.14V5.5a.5.5 0 0 0-1 0v10.8l-2.15-2.15a.5.5 0 1 0-.7.7l3 3Z",
      fill: primaryFill,
    })
  );
};

export const SwipeDown20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ SwipeDown20RegularIcon,
  "SwipeDown20Regular"
);

const ArrowDownLeft16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8.5 13a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 1 0v4.8L13.15 2.14a.5.5 0 1 1 .7.7L3.71 13H8.5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowDownLeft16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowDownLeft16RegularIcon,
  "ArrowDownLeft16Regular"
);

const ArrowUpLeft16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8.5 3a.5.5 0 0 0 0-1h-6a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0V3.7l10.15 10.15a.5.5 0 0 0 .7-.7L3.71 3H8.5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowUpLeft16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowUpLeft16RegularIcon,
  "ArrowUpLeft16Regular"
);

const ArrowUpRight16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7.5 3a.5.5 0 0 1 0-1h6c.28 0 .5.22.5.5v6a.5.5 0 0 1-1 0V3.7L2.85 13.86a.5.5 0 0 1-.7-.7L12.29 3H7.5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowUpRight16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowUpRight16RegularIcon,
  "ArrowUpRight16Regular"
);

const AlignBottom16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M1.5 14a.5.5 0 0 1 0-1h13a.5.5 0 0 1 0 1h-13Zm.5-3.75c0 .97.78 1.75 1.75 1.75h1.5C6.22 12 7 11.22 7 10.25v-6.5C7 2.78 6.22 2 5.25 2h-1.5C2.78 2 2 2.78 2 3.75v6.5Zm1.75.75a.75.75 0 0 1-.75-.75v-6.5c0-.41.34-.75.75-.75h1.5c.41 0 .75.34.75.75v6.5c0 .41-.34.75-.75.75h-1.5ZM9 10.25c0 .97.78 1.75 1.75 1.75h1.5c.97 0 1.75-.78 1.75-1.75v-4.5C14 4.78 13.22 4 12.25 4h-1.5C9.78 4 9 4.78 9 5.75v4.5Zm1.75.75a.75.75 0 0 1-.75-.75v-4.5c0-.41.34-.75.75-.75h1.5c.41 0 .75.34.75.75v4.5c0 .41-.34.75-.75.75h-1.5Z",
      fill: primaryFill,
    })
  );
};

export const AlignBottom16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ AlignBottom16RegularIcon,
  "AlignBottom16Regular"
);

const AlignCenterHorizontal16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M15 7.5a.5.5 0 0 1-.5.5H14v1.25c0 .97-.78 1.75-1.75 1.75h-1.5C9.78 11 9 10.22 9 9.25V8H7v2.25C7 11.22 6.22 12 5.25 12h-1.5C2.78 12 2 11.22 2 10.25V8h-.5a.5.5 0 0 1 0-1H2V4.75C2 3.78 2.78 3 3.75 3h1.5C6.22 3 7 3.78 7 4.75V7h2V5.75C9 4.78 9.78 4 10.75 4h1.5c.97 0 1.75.78 1.75 1.75V7h.5c.28 0 .5.22.5.5ZM3 10.25c0 .41.34.75.75.75h1.5c.41 0 .75-.34.75-.75v-5.5A.75.75 0 0 0 5.25 4h-1.5a.75.75 0 0 0-.75.75v5.5Zm7-1c0 .41.34.75.75.75h1.5c.41 0 .75-.34.75-.75v-3.5a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v3.5Z",
      fill: primaryFill,
    })
  );
};

export const AlignCenterHorizontal16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ AlignCenterHorizontal16RegularIcon,
  "AlignCenterHorizontal16Regular"
);

const AlignSpaceBetweenHorizontalRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M6 1a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H6ZM5 3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3Zm1 11a2 2 0 0 0-2 2v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2H6Zm-1 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-1Z",
      fill: primaryFill,
    })
  );
};

export const AlignSpaceBetweenHorizontalRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ AlignSpaceBetweenHorizontalRegularIcon,
  "AlignSpaceBetweenHorizontalRegular"
);

const AlignSpaceBetweenVerticalRegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: "1em",
      height: "1em",
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3 4a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H3ZM2 6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6Z",
      fill: primaryFill,
    }),
    React.createElement("path", {
      d: "M16 4a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h1a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1Zm-1 2a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V6Z",
      fill: primaryFill,
    })
  );
};

export const AlignSpaceBetweenVerticalRegular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ AlignSpaceBetweenVerticalRegularIcon,
  "AlignSpaceBetweenVerticalRegular"
);

const AlignTop16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M1.5 2a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1h-13ZM2 5.75C2 4.78 2.78 4 3.75 4h1.5C6.22 4 7 4.78 7 5.75v6.5C7 13.22 6.22 14 5.25 14h-1.5C2.78 14 2 13.22 2 12.25v-6.5ZM3.75 5a.75.75 0 0 0-.75.75v6.5c0 .41.34.75.75.75h1.5c.41 0 .75-.34.75-.75v-6.5A.75.75 0 0 0 5.25 5h-1.5ZM9 5.75C9 4.78 9.78 4 10.75 4h1.5c.97 0 1.75.78 1.75 1.75v4.5c0 .97-.78 1.75-1.75 1.75h-1.5C9.78 12 9 11.22 9 10.25v-4.5ZM10.75 5a.75.75 0 0 0-.75.75v4.5c0 .41.34.75.75.75h1.5c.41 0 .75-.34.75-.75v-4.5a.75.75 0 0 0-.75-.75h-1.5Z",
      fill: primaryFill,
    })
  );
};

export const AlignTop16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ AlignTop16RegularIcon,
  "AlignTop16Regular"
);

const ArrowAutofitDown20FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "m15.71 14.77-.7.73V2.75a.75.75 0 1 0-1.5 0v12.76l-.72-.74a.75.75 0 0 0-1.08 1.04l1.82 1.88a1 1 0 0 0 1.44 0l1.82-1.88a.75.75 0 0 0-1.08-1.04ZM5 17a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h6.25a.75.75 0 0 1 0 1.5H5a.5.5 0 0 0-.5.5v10c0 .28.22.5.5.5h4.25a.75.75 0 0 1 0 1.5H5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowAutofitDown20Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowAutofitDown20FilledIcon,
  "ArrowAutofitDown20Filled"
);

const ArrowAutofitUp20FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "m15.71 5.23-.7-.73v12.75a.75.75 0 1 1-1.5 0V4.49l-.72.74a.75.75 0 0 1-1.08-1.04l1.82-1.88a1 1 0 0 1 1.44 0l1.82 1.88a.75.75 0 0 1-1.08 1.04ZM5 3a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h6.25a.75.75 0 0 0 0-1.5H5a.5.5 0 0 1-.5-.5V5c0-.28.22-.5.5-.5h4.25a.75.75 0 0 0 0-1.5H5Z",
      fill: primaryFill,
    })
  );
};

export const ArrowAutofitUp20Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowAutofitUp20FilledIcon,
  "ArrowAutofitUp20Filled"
);

const ArrowDownload20FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M15.24 16.5a.75.75 0 0 1 .1 1.5H4.76a.75.75 0 0 1-.1-1.5h10.6ZM10 2c.38 0 .7.28.75.65V12.95l2.97-2.98c.27-.26.68-.29.98-.07l.08.07c.27.27.3.68.07.98l-.07.08-4.24 4.25-.07.07-.1.05-.03.03-.1.03-.11.03-.07.01H10l-.15-.01-.08-.03a.73.73 0 0 1-.26-.14l-4.29-4.29A.75.75 0 0 1 6.2 9.9l.08.07 2.97 2.97V2.75c0-.41.34-.75.75-.75Z",
      fill: primaryFill,
    })
  );
};

export const ArrowDownload20Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowDownload20FilledIcon,
  "ArrowDownload20Filled"
);

const ArrowReset24FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M7.2 2.54a1 1 0 0 1 0 1.42L5.42 5.75h7.84a8 8 0 1 1-8 8 1 1 0 1 1 2 0 6 6 0 1 0 6-6H5.41l1.8 1.8a1 1 0 0 1-1.42 1.4l-3.5-3.5a1 1 0 0 1 0-1.4l3.5-3.5a1 1 0 0 1 1.42 0Z",
      fill: primaryFill,
    })
  );
};

export const ArrowReset24Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowReset24FilledIcon,
  "ArrowReset24Filled"
);

const ArrowUpload20FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4.5 2a.75.75 0 0 0 0 1.5H15A.75.75 0 0 0 15 2H4.5Zm6 15.35a.75.75 0 0 1-1.5-.1V7.05l-2.97 2.98-.08.07a.75.75 0 0 1-.98-1.14l4.29-4.28a.73.73 0 0 1 .26-.15l.08-.02.15-.02h.06l.07.01.12.03.09.04.04.02.09.06.07.06 4.24 4.26.07.08c.22.3.2.71-.07.98l-.08.07c-.3.22-.72.2-.98-.07L10.5 7.05V17.35Z",
      fill: primaryFill,
    })
  );
};

export const ArrowUpload20Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ArrowUpload20FilledIcon,
  "ArrowUpload20Filled"
);

const ChevronDown16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3.2 5.74a.75.75 0 0 1 1.06-.04L8 9.23l3.74-3.53a.75.75 0 1 1 1.02 1.1l-4.25 4a.75.75 0 0 1-1.02 0l-4.25-4a.75.75 0 0 1-.04-1.06Z",
      fill: primaryFill,
    })
  );
};

export const ChevronDown16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronDown16FilledIcon,
  "ChevronDown16Filled"
);

const ChevronRight16FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M5.74 3.2a.75.75 0 0 0-.04 1.06L9.23 8 5.7 11.74a.75.75 0 1 0 1.1 1.02l4-4.25a.75.75 0 0 0 0-1.02l-4-4.25a.75.75 0 0 0-1.06-.04Z",
      fill: primaryFill,
    })
  );
};

export const ChevronRight16Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronRight16FilledIcon,
  "ChevronRight16Filled"
);

const Copy20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8ZM7 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4ZM4 6a2 2 0 0 1 1-1.73V14.5A2.5 2.5 0 0 0 7.5 17h6.23A2 2 0 0 1 12 18H7.5A3.5 3.5 0 0 1 4 14.5V6Z",
      fill: primaryFill,
    })
  );
};

export const Copy20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Copy20RegularIcon,
  "Copy20Regular"
);

const Cut20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M5.92 2.23a.5.5 0 0 0-.84.54L9.4 9.43l-1.92 2.96a3 3 0 1 0 .78.64L10 10.35l1.74 2.68a3 3 0 1 0 .78-.64L5.92 2.23ZM14 17a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM4 15a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm7.2-6.49-.6-.92 3.48-5.36a.5.5 0 0 1 .84.54l-3.73 5.74Z",
      fill: primaryFill,
    })
  );
};

export const Cut20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Cut20RegularIcon,
  "Cut20Regular"
);

const Delete20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8.5 4h3a1.5 1.5 0 0 0-3 0Zm-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.05l-1.2 10.34A3 3 0 0 1 12.27 18H7.73a3 3 0 0 1-2.98-2.66L3.55 5H2.5a.5.5 0 0 1 0-1h5ZM5.74 15.23A2 2 0 0 0 7.73 17h4.54a2 2 0 0 0 1.99-1.77L15.44 5H4.56l1.18 10.23ZM8.5 7.5c.28 0 .5.22.5.5v6a.5.5 0 0 1-1 0V8c0-.28.22-.5.5-.5ZM12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V8Z",
      fill: primaryFill,
    })
  );
};

export const Delete20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Delete20RegularIcon,
  "Delete20Regular"
);

const DocumentCopy20FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M11 6.5V2H7.5C6.67 2 6 2.67 6 3.5v11c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5V8h-4.5A1.5 1.5 0 0 1 11 6.5Zm1 0V2.25L16.75 7H12.5a.5.5 0 0 1-.5-.5ZM4 5a1 1 0 0 1 1-1v10.5A2.5 2.5 0 0 0 7.5 17H15a1 1 0 0 1-1 1H7.55A3.55 3.55 0 0 1 4 14.45V5Z",
      fill: primaryFill,
    })
  );
};

export const DocumentCopy20Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ DocumentCopy20FilledIcon,
  "DocumentCopy20Filled"
);

const Form24FilledIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8.25 10a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-.75 6.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM3 6.25C3 4.45 4.46 3 6.25 3h11.5C19.55 3 21 4.46 21 6.25v11.5c0 1.8-1.46 3.25-3.25 3.25H6.25A3.25 3.25 0 0 1 3 17.75V6.25Zm3 4.5a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM8.25 14a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12 10.75c0 .41.34.75.75.75h4.5a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75Zm.75 4.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM6 6.25c0 .41.34.75.75.75h10.5a.75.75 0 0 0 0-1.5H6.75a.75.75 0 0 0-.75.75Z",
      fill: primaryFill,
    })
  );
};

export const Form24Filled = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Form24FilledIcon,
  "Form24Filled"
);

const Rename20RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 20,
      height: 20,
      viewBox: "0 0 20 20",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8.5 2a.5.5 0 0 0 0 1h1v14h-1a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-1V3h1a.5.5 0 0 0 0-1h-3Zm-4 2h4v1h-4C3.67 5 3 5.67 3 6.5v7c0 .83.67 1.5 1.5 1.5h4v1h-4A2.5 2.5 0 0 1 2 13.5v-7A2.5 2.5 0 0 1 4.5 4Zm11 11h-4v1h4a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 15.5 4h-4v1h4c.83 0 1.5.67 1.5 1.5v7c0 .83-.67 1.5-1.5 1.5Z",
      fill: primaryFill,
    })
  );
};

export const Rename20Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Rename20RegularIcon,
  "Rename20Regular"
);

const SquareDismiss16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h1.76a5.5 5.5 0 0 1-.66-1H4.5A1.5 1.5 0 0 1 3 11.5v-7C3 3.67 3.67 3 4.5 3h7c.83 0 1.5.67 1.5 1.5v1.1c.36.18.7.4 1 .66V4.5A2.5 2.5 0 0 0 11.5 2h-7Zm6 13a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm1.85-6.35c.2.2.2.5 0 .7l-1.14 1.15 1.14 1.15a.5.5 0 0 1-.7.7l-1.15-1.14-1.15 1.14a.5.5 0 0 1-.7-.7l1.14-1.15-1.14-1.15a.5.5 0 1 1 .7-.7l1.15 1.14 1.15-1.14c.2-.2.5-.2.7 0Z",
      fill: primaryFill,
    })
  );
};

export const SquareDismiss16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ SquareDismiss16RegularIcon,
  "SquareDismiss16Regular"
);

const ChevronUp12RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2.15 7.35c.2.2.5.2.7 0L6 4.21l3.15 3.14a.5.5 0 1 0 .7-.7l-3.5-3.5a.5.5 0 0 0-.7 0l-3.5 3.5a.5.5 0 0 0 0 .7Z",
      fill: primaryFill,
    })
  );
};

export const ChevronUp12Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronUp12RegularIcon,
  "ChevronUp12Regular"
);

const ChevronDown12RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 12,
      height: 12,
      viewBox: "0 0 12 12",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2.15 4.65c.2-.2.5-.2.7 0L6 7.79l3.15-3.14a.5.5 0 1 1 .7.7l-3.5 3.5a.5.5 0 0 1-.7 0l-3.5-3.5a.5.5 0 0 1 0-.7Z",
      fill: primaryFill,
    })
  );
};

export const ChevronDown12Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ChevronDown12RegularIcon,
  "ChevronDown12Regular"
);

const ImageAdd24RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M18.75 4C20.55 4 22 5.46 22 7.25v11.5c0 1.8-1.46 3.25-3.25 3.25H7.25A3.25 3.25 0 0 1 4 18.75V12.5c.47.2.98.34 1.5.42v5.83c0 .2.04.4.1.6l5.83-5.7a2.25 2.25 0 0 1 3.02-.12l.12.11 5.83 5.7c.06-.18.1-.38.1-.59V7.25c0-.97-.78-1.75-1.75-1.75h-5.83A6.46 6.46 0 0 0 12.5 4h6.25Zm-6.2 10.64-.07.07-5.81 5.7c.18.06.38.09.58.09h11.5c.2 0 .4-.03.58-.1l-5.8-5.69a.75.75 0 0 0-.97-.07Zm3.7-7.14a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5ZM6.5 1a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm9.75 8a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM6.5 3h-.09a.5.5 0 0 0-.4.4L6 3.5V6H3.4a.5.5 0 0 0-.4.41v.18c.04.2.2.36.4.4l.1.01H6v2.6c.05.2.2.36.41.4h.18a.5.5 0 0 0 .4-.4L7 9.5V7h2.6a.5.5 0 0 0 .4-.41v-.18a.5.5 0 0 0-.4-.4L9.5 6H7V3.4a.5.5 0 0 0-.41-.4H6.5Z",
      fill: primaryFill,
    })
  );
};

export const ImageAdd24Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ ImageAdd24RegularIcon,
  "ImageAdd24Regular"
);

const SlideAdd24RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v6.06a6.52 6.52 0 0 0-1.5-1.08V6.75c0-.69-.56-1.25-1.25-1.25H4.75c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h6.33c.08.52.22 1.03.42 1.5H4.75A2.75 2.75 0 0 1 2 17.25V6.75ZM23 17.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0Zm-5 .5v2.5a.5.5 0 1 1-1 0V18h-2.5a.5.5 0 1 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.5a.5.5 0 1 1 0 1H18Z",
      fill: primaryFill,
    })
  );
};

export const SlideAdd24Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ SlideAdd24RegularIcon,
  "SlideAdd24Regular"
);

const TabAdd24RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3 5.75A2.75 2.75 0 0 1 5.75 3h12.5A2.75 2.75 0 0 1 21 5.75v6.27c-.46-.3-.97-.53-1.5-.7V5.74c0-.69-.56-1.25-1.25-1.25H5.75c-.69 0-1.25.56-1.25 1.25v12.5c0 .69.56 1.25 1.25 1.25h5.56c.18.53.42 1.04.71 1.5H5.75A2.75 2.75 0 0 1 3 18.25V5.75ZM23 17.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0Zm-5 .5v2.5a.5.5 0 1 1-1 0V18h-2.5a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.5a.5.5 0 0 1 0 1H18Z",
      fill: primaryFill,
    })
  );
};

export const TabAdd24Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TabAdd24RegularIcon,
  "TabAdd24Regular"
);

const TextAddT24RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 24,
      height: 24,
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M4 4.75c0-.41.34-.75.75-.75h12.5c.41 0 .75.34.75.75v2a.75.75 0 0 1-1.5 0V5.5h-4.75v8.97A6.47 6.47 0 0 0 11.5 20H8.75a.75.75 0 0 1 0-1.5h1.5v-13H5.5v1.25a.75.75 0 0 1-1.5 0v-2ZM23 17.5a5.5 5.5 0 1 0-11 0 5.5 5.5 0 0 0 11 0Zm-5 .5v2.5a.5.5 0 1 1-1 0V18h-2.5a.5.5 0 0 1 0-1H17v-2.5a.5.5 0 1 1 1 0V17h2.5a.5.5 0 0 1 0 1H18Z",
      fill: primaryFill,
    })
  );
};

export const TextAddT24Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ TextAddT24RegularIcon,
  "TextAddT24Regular"
);

const Text16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M3 2.5c0-.28.22-.5.5-.5h8c.28 0 .5.22.5.5v2a.5.5 0 0 1-1 0V3H8v10h1a.5.5 0 0 1 0 1H6a.5.5 0 0 1 0-1h1V3H4v1.5a.5.5 0 0 1-1 0v-2Z",
      fill: primaryFill,
    })
  );
};

export const Text16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Text16RegularIcon,
  "Text16Regular"
);

const Settings16RegularIcon = (props) => {
  const { fill: primaryFill = "currentColor", className } = props;
  return React.createElement(
    "svg",
    Object.assign({}, props, {
      width: 16,
      height: 16,
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      className: className,
    }),
    React.createElement("path", {
      d: "M8 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM7 8a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm3.62-3.6a.7.7 0 0 1-.83-.57l-.26-1.42a.35.35 0 0 0-.27-.28 6.07 6.07 0 0 0-2.52 0 .35.35 0 0 0-.27.29L6.2 3.83a.71.71 0 0 1-.94.54l-1.36-.49a.36.36 0 0 0-.38.1c-.57.63-1 1.37-1.26 2.17-.05.14 0 .29.1.38l1.1.93a.7.7 0 0 1 0 1.08l-1.1.93c-.1.1-.15.24-.1.38.26.8.69 1.54 1.26 2.17.1.1.25.14.38.1l1.36-.49a.7.7 0 0 1 .94.54l.26 1.41c.02.15.13.26.27.29a6.07 6.07 0 0 0 2.52 0 .35.35 0 0 0 .27-.29l.26-1.41a.71.71 0 0 1 .94-.54l1.36.49c.13.04.28 0 .38-.1.57-.63 1-1.37 1.26-2.17a.35.35 0 0 0-.1-.38l-1.1-.93a.7.7 0 0 1 0-1.08l1.1-.93c.1-.1.15-.24.1-.38-.26-.8-.69-1.54-1.26-2.17a.36.36 0 0 0-.38-.1l-1.36.49a.71.71 0 0 1-.11.03ZM4 4.98l.94.33a1.71 1.71 0 0 0 2.25-1.3l.18-.97a5.1 5.1 0 0 1 1.26 0l.18.97a1.7 1.7 0 0 0 2.25 1.3l.94-.33c.26.33.47.7.63 1.08l-.75.64a1.7 1.7 0 0 0 0 2.6l.75.64c-.16.39-.37.75-.63 1.08l-.94-.33a1.7 1.7 0 0 0-2.25 1.3l-.18.97a5.1 5.1 0 0 1-1.26 0l-.18-.97a1.7 1.7 0 0 0-2.25-1.3l-.94.33c-.26-.33-.47-.7-.63-1.08l.75-.64a1.7 1.7 0 0 0 0-2.6l-.75-.64c.16-.39.37-.75.63-1.08Z",
      fill: primaryFill,
    })
  );
};

export const Settings16Regular = /*#__PURE__*/ wrapIcon(
  /*#__PURE__*/ Settings16RegularIcon,
  "Settings16Regular"
);
