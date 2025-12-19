export const thinScrollBar = `
    ::-webkit-scrollbar {
        width: 4px;
        height: 4px;
        background-color: transparent;
    }
    ::-webkit-scrollbar-track {
        width: 4px;
        background-color: transparent;
    }
    ::-webkit-scrollbar-thumb {
        width: 4px;
        background-color: var(--pl-scrollbar-thumb);
        border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: var(--pl-scrollbar-thumb-hover);
    }
`;

export const fatScrollBar = `
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background-color: var(--pl-scrollbar-track);
    }
    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background-color: var(--pl-scrollbar-thumb);
    }
    ::-webkit-scrollbar-thumb:hover {
        background-color: var(--pl-scrollbar-thumb-hover);
    }
    ::-webkit-scrollbar-track {
        border-radius: 8px;
        background-color: transparent;
    }
`;

export const tabMaxHeight = ` 
    max-height: calc(100vh - 45px);
`;
