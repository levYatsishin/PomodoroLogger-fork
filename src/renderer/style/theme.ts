import { createGlobalStyle } from 'styled-components';

export type ThemeName = 'light' | 'dark';

export interface AppTheme {
    name: ThemeName;
    colors: {
        appBg: string;
        surface: string;
        surfaceAlt: string;
        surfaceHover: string;
        cardBg: string;
        cardMuted: string;
        cardFade: string;
        text: string;
        textMuted: string;
        textSubtle: string;
        border: string;
        borderStrong: string;
        shadow: string;
        overlay: string;
        accent: string;
        accentSoft: string;
        scrollbarTrack: string;
        scrollbarThumb: string;
        scrollbarThumbHover: string;
        tagBg: string;
        tagText: string;
        highlight: string;
        listFade: string;
        listFadeSoft: string;
        loadingBg: string;
        splashBg: string;
        switchBg: string;
    };
}

export const lightTheme: AppTheme = {
    name: 'light',
    colors: {
        appBg: '#ffffff',
        surface: '#f5f5f5',
        surfaceAlt: '#eaeaea',
        surfaceHover: '#e1e1e1',
        cardBg: '#ffffff',
        cardMuted: '#f8f8f8',
        cardFade: 'rgba(255, 255, 255, 0.001)',
        text: '#1f1f1f',
        textMuted: '#555555',
        textSubtle: '#777777',
        border: '#dfdfdf',
        borderStrong: '#c7c7c7',
        shadow: 'rgba(0, 0, 0, 0.14)',
        overlay: 'rgba(255, 255, 255, 0.98)',
        accent: '#7DAEA3',
        accentSoft: 'rgba(125, 174, 163, 0.18)',
        scrollbarTrack: '#f5f5f5',
        scrollbarThumb: 'rgba(50, 50, 50, 0.3)',
        scrollbarThumbHover: 'rgba(50, 50, 50, 0.5)',
        tagBg: 'rgba(0, 0, 0, 0.08)',
        tagText: '#222222',
        highlight: 'rgba(255, 222, 89, 0.7)',
        listFade: 'rgba(222, 222, 222, 1)',
        listFadeSoft: 'rgba(222, 222, 222, 0.001)',
        loadingBg: 'rgba(230, 230, 230, 0.2)',
        splashBg: 'rgba(255, 255, 255, 1)',
        switchBg: '#c8c8c8',
    },
};

export const darkTheme: AppTheme = {
    name: 'dark',
    colors: {
        appBg: '#1D2021', // bg_hard
        surface: '#282828', // bg
        surfaceAlt: '#32302F', // bg_soft
        surfaceHover: '#3C3836',
        cardBg: '#282828',
        cardMuted: '#32302F',
        cardFade: 'rgba(29, 32, 33, 0.001)',
        text: '#D4BE98', // fg
        textMuted: '#928374', // gray
        textSubtle: '#665C54', // black in palette naming
        border: '#3C3836',
        borderStrong: '#504945',
        shadow: 'rgba(0, 0, 0, 0.45)',
        overlay: 'rgba(29, 32, 33, 0.94)',
        accent: '#7DAEA3', // blue from palette
        accentSoft: 'rgba(125, 174, 163, 0.28)',
        scrollbarTrack: '#1D2021',
        scrollbarThumb: 'rgba(146, 131, 116, 0.35)',
        scrollbarThumbHover: 'rgba(146, 131, 116, 0.5)',
        tagBg: 'rgba(102, 92, 84, 0.3)',
        tagText: '#D4BE98',
        highlight: 'rgba(216, 166, 87, 0.5)', // yellow
        listFade: 'rgba(50, 48, 47, 1)',
        listFadeSoft: 'rgba(50, 48, 47, 0.001)',
        loadingBg: 'rgba(146, 131, 116, 0.08)',
        splashBg: 'rgba(29, 32, 33, 1)',
        switchBg: '#504945',
    },
};

export const themes: Record<ThemeName, AppTheme> = {
    light: lightTheme,
    dark: darkTheme,
};

export const GlobalStyle = createGlobalStyle`
    :root {
        --pl-bg: ${(props: any) => props.theme.colors.appBg};
        --pl-surface: ${(props: any) => props.theme.colors.surface};
        --pl-surface-alt: ${(props: any) => props.theme.colors.surfaceAlt};
        --pl-surface-hover: ${(props: any) => props.theme.colors.surfaceHover};
        --pl-card-bg: ${(props: any) => props.theme.colors.cardBg};
        --pl-card-muted: ${(props: any) => props.theme.colors.cardMuted};
        --pl-card-fade: ${(props: any) => props.theme.colors.cardFade};
        --pl-text: ${(props: any) => props.theme.colors.text};
        --pl-text-muted: ${(props: any) => props.theme.colors.textMuted};
        --pl-text-subtle: ${(props: any) => props.theme.colors.textSubtle};
        --pl-border: ${(props: any) => props.theme.colors.border};
        --pl-border-strong: ${(props: any) => props.theme.colors.borderStrong};
        --pl-shadow: ${(props: any) => props.theme.colors.shadow};
        --pl-overlay: ${(props: any) => props.theme.colors.overlay};
        --pl-accent: ${(props: any) => props.theme.colors.accent};
        --pl-accent-soft: ${(props: any) => props.theme.colors.accentSoft};
        --hover-background: ${(props: any) => props.theme.colors.accentSoft};
        --pl-scrollbar-track: ${(props: any) => props.theme.colors.scrollbarTrack};
        --pl-scrollbar-thumb: ${(props: any) => props.theme.colors.scrollbarThumb};
        --pl-scrollbar-thumb-hover: ${(props: any) => props.theme.colors.scrollbarThumbHover};
        --pl-tag-bg: ${(props: any) => props.theme.colors.tagBg};
        --pl-tag-text: ${(props: any) => props.theme.colors.tagText};
        --pl-highlight: ${(props: any) => props.theme.colors.highlight};
        --pl-list-fade: ${(props: any) => props.theme.colors.listFade};
        --pl-list-fade-soft: ${(props: any) => props.theme.colors.listFadeSoft};
        --pl-loading-bg: ${(props: any) => props.theme.colors.loadingBg};
        --pl-splash-bg: ${(props: any) => props.theme.colors.splashBg};
        --pl-switch-bg: ${(props: any) => props.theme.colors.switchBg};
    }

    body {
        background: var(--pl-bg);
        color: var(--pl-text);
        color-scheme: ${(props: any) => props.theme.name};
    }

    #root {
        background: var(--pl-bg);
        color: var(--pl-text);
        min-height: 100vh;
    }

    h1, h2, h3, h4, h5, h6, p, span, label, li {
        color: var(--pl-text);
    }

    a {
        color: var(--pl-accent);
    }

    .ant-tabs-bar {
        background: var(--pl-surface);
        border-bottom: 1px solid var(--pl-border);
    }

    .ant-tabs-nav .ant-tabs-tab {
        color: var(--pl-text-muted);
    }

    .ant-tabs-nav .ant-tabs-tab:hover,
    .ant-tabs-nav .ant-tabs-tab-active {
        color: var(--pl-accent);
    }

    .ant-tabs-ink-bar {
        background-color: var(--pl-accent);
    }

    .ant-layout {
        background: transparent;
    }

    .ant-divider {
        background: var(--pl-border);
    }

    .ant-modal-content,
    .ant-modal-header,
    .ant-modal-body,
    .ant-modal-footer {
        background: var(--pl-card-bg);
        color: var(--pl-text);
    }

    .ant-modal-header,
    .ant-modal-footer {
        border-color: var(--pl-border);
    }

    .ant-select-selection,
    .ant-select-dropdown,
    .ant-input,
    .ant-input-number,
    .ant-input-affix-wrapper {
        background: var(--pl-card-bg);
        color: var(--pl-text);
        border-color: var(--pl-border);
    }
    .ant-select-selection__placeholder,
    .ant-input::placeholder,
    .ant-select-search__field__placeholder,
    .ant-input-affix-wrapper .ant-input::placeholder {
        color: var(--pl-text-subtle);
    }

    .ant-select-dropdown-menu-item,
    .ant-select-dropdown-menu-item-active,
    .ant-select-dropdown-menu-item-selected {
        color: var(--pl-text);
    }

    .ant-select-dropdown-menu-item-active,
    .ant-select-dropdown-menu-item-selected,
    .ant-select-dropdown-menu-item:hover {
        background: var(--pl-accent-soft) !important;
        color: var(--pl-text) !important;
    }

    .ant-dropdown-menu,
    .ant-tooltip-inner,
    .ant-popover-inner,
    .ant-message-notice-content,
    .ant-notification-notice,
    .ant-tooltip {
        background: var(--pl-card-bg);
        color: var(--pl-text);
        border-color: var(--pl-border);
    }
    .ant-tooltip-inner {
        color: var(--pl-text);
    }
    .ant-card,
    .ant-card-bordered,
    .ant-card-head {
        background: var(--pl-card-bg);
        color: var(--pl-text);
        border-color: var(--pl-border);
    }
    .ant-statistic-title,
    .ant-statistic-content,
    .ant-statistic-content-value,
    .ant-statistic-content-prefix,
    .ant-statistic-content-suffix {
        color: var(--pl-text);
    }
    .ant-badge-status-text,
    .ant-badge {
        color: var(--pl-text);
    }
    .ant-tag { color: var(--pl-text); background: var(--pl-card-muted); border-color: var(--pl-border); }
    .ant-statistic-title, .ant-statistic-content, .ant-statistic-content-value, .ant-statistic-content-prefix, .ant-statistic-content-suffix { color: var(--pl-text); }
    .ant-badge-status-text, .ant-badge { color: var(--pl-text); }

    /* ECharts tooltips (default classes) */
    .echarts-tooltip {
        color: var(--pl-text);
        background: var(--pl-card-bg) !important;
        border: 1px solid var(--pl-border);
    }
    .ant-dropdown-menu-item,
    .ant-menu-item,
    .ant-menu-submenu-title,
    .ant-popover-title {
        color: var(--pl-text);
    }
    .ant-dropdown-menu-item-selected,
    .ant-select-dropdown-menu-item-selected {
        background: var(--pl-accent-soft);
        color: var(--pl-text);
    }
    .focus-option {
        color: var(--pl-text);
    }

    .ant-tag { color: var(--pl-text); background: var(--pl-card-muted); border-color: var(--pl-border); }
    .ant-statistic-title, .ant-statistic-content, .ant-statistic-content-value, .ant-statistic-content-prefix, .ant-statistic-content-suffix { color: var(--pl-text); }
    .ant-badge-status-text, .ant-badge { color: var(--pl-text); }

    /* ECharts tooltips (default classes) */
    .echarts-tooltip {
        color: var(--pl-text);
        background: var(--pl-card-bg) !important;
        border: 1px solid var(--pl-border);
    }
    .ant-select-dropdown-menu-item,
    .ant-select-dropdown-menu-item-active,
    .ant-select-dropdown-menu-item-selected {
        color: var(--pl-text);
    }

    .ant-btn-default,
    .ant-btn:not(.ant-btn-primary):not(.ant-btn-danger) {
        background: var(--pl-card-bg);
        border-color: var(--pl-border);
        color: var(--pl-text);
    }
    .ant-btn-primary {
        background: var(--pl-accent);
        border-color: var(--pl-accent);
        color: #1D2021;
    }
    .ant-btn-primary:hover,
    .ant-btn-primary:focus {
        background: var(--pl-accent-soft);
        border-color: var(--pl-accent);
        color: #1D2021;
    }
    .ant-btn-danger {
        background: #EA6962;
        border-color: #EA6962;
        color: #1D2021;
    }
    .ant-btn-danger:hover,
    .ant-btn-danger:focus {
        background: #f07f78;
        border-color: #f07f78;
        color: #1D2021;
    }
    .ant-btn[disabled],
    .ant-btn[disabled]:hover {
        color: var(--pl-text-subtle);
        background: var(--pl-surface);
        border-color: var(--pl-border);
    }

    .ant-switch {
        background: var(--pl-switch-bg);
    }

    .ant-switch-checked {
        background: var(--pl-accent);
    }
    .ant-switch-inner {
        color: #0b1220;
    }
    .ant-switch-handle {
        background: var(--pl-card-bg);
    }

    .ant-progress-circle .ant-progress-text {
        color: var(--pl-text);
    }
    .ant-progress-circle-trail {
        stroke: var(--pl-border);
    }

    .ant-slider-rail {
        background: var(--pl-border-strong);
    }
    .ant-slider-track {
        background: var(--pl-accent);
    }
    .ant-slider-handle {
        border-color: var(--pl-accent);
        background: var(--pl-card-bg);
        box-shadow: 0 0 0 2px var(--pl-accent-soft);
    }
    .ant-slider-mark-text,
    .ant-slider-dot {
        color: var(--pl-text-muted) !important;
    }
    .ant-slider-dot-active {
        border-color: var(--pl-accent) !important;
    }
    .ant-slider-mark-text-active {
        color: var(--pl-text) !important;
    }
    .ant-slider:hover .ant-slider-track {
        background: var(--pl-accent);
    }

    .ant-dropdown-menu-item:hover,
    .ant-select-dropdown-menu-item:hover {
        background: var(--pl-surface-hover);
    }

    .ant-popover-arrow-content,
    .ant-tooltip-arrow::before {
        background: var(--pl-card-bg);
    }
`;
