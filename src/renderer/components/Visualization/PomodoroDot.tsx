import styled from 'styled-components';
import * as React from 'react';

const getCssVar = (name: string, fallback: string) => {
    if (typeof document === 'undefined') {
        return fallback;
    }
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
};

const Svg = styled.svg`
    user-select: none;
    transition: transform 0.2s;
    :hover {
        transform: scale(1.4);
    }
`;

interface Props {
    num: number;
}

function formatThousand(num: number) {
    if (num < 1000) {
        return Math.floor(num);
    }

    const thousand = Math.floor(num / 1000);
    const hundred = Math.floor(num / 100) % 10;
    if (hundred === 0) {
        return thousand + 'k';
    }

    return `${thousand}.${hundred}k`;
}

export const PomodoroDot: React.FC<Props> = (props) => {
    const num = formatThousand(props.num);
    const textColor = getCssVar('--pl-text', '#D4BE98');
    const base = getCssVar('--pl-tag-bg', '#665C54');
    return (
        <Svg
            className="pomodoro-dot"
            width="20"
            height="20"
            style={{ margin: '0 0 2px 0', cursor: 'pointer' }}
            viewBox={'0 0 28 28'}
        >
            <title>{`${props.num} Pomodoros`}</title>
            <circle cx={14} cy={14} r={14} fill={base} />
            <text
                x={14}
                y={14.5}
                textAnchor={'middle'}
                alignmentBaseline={'central'}
                fill="rgba(0, 0, 0, 0.25)"
            >
                {num}
            </text>
            <text
                x={14}
                y={13.5}
                textAnchor={'middle'}
                alignmentBaseline={'central'}
                fill={textColor}
            >
                {num}
            </text>
        </Svg>
    );
};
