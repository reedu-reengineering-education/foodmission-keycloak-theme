import type { KcContext as BaseKcContext } from "../kcContext";

// Login-specific KcContext - extract only the Login page type from the union
export type KcContext = Extract<BaseKcContext, { pageId: "login.ftl" }>;
