import React, { useMemo } from 'react';
import { formatTime } from '../../../renderer/utils';
import shortid from 'shortid';
import styled from 'styled-components';
import { throttle } from 'lodash';

const AnimeSvg = styled.svg`
    transition: transform 0.25s;
    user-select: none;
    cursor: default;
    font-weight: 600;
    .clip-path {
        transition: all 0.6s 0.1s;
    }
    .label {
        font-weight: 700;
    }
`;

export interface Props {
    type: string;
    color?: string;
    value: string;
    title?: string;
}

const getCssVar = (name: string, fallback: string) => {
    if (typeof document === 'undefined') {
        return fallback;
    }
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
};

export const Badge = (props: Props) => {
    const { color = '#32d31f', type, value, title } = props;
    const textColor = getCssVar('--pl-text', '#D4BE98');
    const leftBg = getCssVar('--pl-card-muted', '#665C54');
    const baseId = React.useMemo(shortid.generate, []);
    const textSize = Math.floor(props.type.length * 6.5 + 10);
    const timeSize = Math.floor(value.length * 6.5 + 10);
    const idA = `${baseId}-a`;
    const idB = `${baseId}-b`;
    return (
        <svg width={textSize + timeSize} height="20" style={{ margin: '1px 4px 1px 4px' }}>
            <title>{title}</title>
            <clipPath id={idA}>
                <rect width={textSize + timeSize} height="20" rx="3" fill="#fff" />
            </clipPath>
            <g clipPath={`url(#${idA})`}>
                <path fill={leftBg} d={`M0 0h${textSize}v20H0z`} />
                <path fill={color} d={`M${textSize} 0h${timeSize}v20H${textSize}z`} />
            </g>
            <g
                fill={textColor}
                textAnchor="middle"
                fontFamily="DejaVu Sans,Verdana,Geneva,sans-serif"
                fontSize="110"
            >
                {/* tslint:disable-next-line:max-line-length */}
                <text
                    x={(textSize / 2) * 10}
                    y="140"
                    transform="scale(.1)"
                    textLength={textSize * 10 - 100}
                    style={{ paintOrder: 'fill', stroke: 'none', filter: 'none' }}
                >
                    {type}
                </text>
                {/* tslint:disable-next-line:max-line-length */}
                <text
                    x={textSize * 10 + timeSize * 5}
                    y="142"
                    transform="scale(.1)"
                    textLength={timeSize * 10 - 100}
                    style={{ paintOrder: 'fill', stroke: 'none', filter: 'none' }}
                >
                    {value}
                </text>
            </g>
        </svg>
    );
};

interface TimeBadgeProps {
    spentTime?: number;
    leftTime?: number;
    collapsed?: boolean;
}

export const TimeBadge = React.memo((props: TimeBadgeProps) => {
    const { collapsed = false } = props;
    const [clipState, setClipState] = React.useState('default');
    const id = React.useMemo(shortid.generate, []);
    const id1 = id + '1';
    const textColor = getCssVar('--pl-text', '#D4BE98');
    const cardBg = getCssVar('--pl-card-bg', '#282828');
    const barColor = '#b37e5b';
    const leftBg = getCssVar('--pl-card-muted', '#665C54');
    let exceeded = false;
    let { spentTime = 0, leftTime = 0 } = props;
    if (leftTime < 0) {
        leftTime = -leftTime;
        exceeded = true;
    }
    if (spentTime < 0) {
        spentTime = 0;
    }

    const sSpentTime = formatTime(spentTime);
    const sEstimatedTime = formatTime(leftTime);
    const sum = spentTime + leftTime;
    const totalWidth = 168;
    const spentWidth = sum ? ((totalWidth - 100) / sum) * spentTime + 50 : 90;
    const estimatedWidth = totalWidth - spentWidth;
    const _onMove = useMemo(
        () =>
            throttle((event: React.MouseEvent<HTMLOrSVGElement>) => {
                let node = event.nativeEvent.target as Element | null;
                while (node && node.tagName !== 'svg') {
                    node = node.parentElement;
                }
                if (!node) {
                    return;
                }

                const x = node.getBoundingClientRect().x;
                const offset = event.clientX - x;
                if (offset < totalWidth / 4) {
                    setClipState('spent');
                } else if (offset > (totalWidth / 4) * 3) {
                    setClipState('left');
                } else {
                    setClipState('default');
                }
            }, 100),
        []
    );
    const onMove = (event: React.MouseEvent<any>) => {
        event.persist();
        _onMove(event);
    };
    const onLeave = () => {
        setTimeout(() => {
            setClipState('default');
        }, 110);
    };
    let state = clipState;
    if (estimatedWidth < 53) {
        state = 'spent';
    } else if (spentWidth < 53) {
        state = 'left';
    }

    let transform = `translate(0 0)`;
    switch (state) {
        case 'spent':
            transform = `translate(${totalWidth} 0)`;
            break;
        case 'left':
            transform = `translate(${-totalWidth} 0)`;
            break;
    }

    if (collapsed) {
        return (
            <AnimeSvg
                width={totalWidth}
                height="20"
                style={{ margin: '0 0 2px 6px', fontSize: 12 }}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
            >
                <g clipPath={`url(#${id1})`}>
                    <text
                        x={0}
                        y={10}
                        textLength={sSpentTime.length * 6.2}
                        textAnchor={'start'}
                        alignmentBaseline={'central'}
                        fill={textColor}
                    >
                        {sSpentTime}
                    </text>
                </g>
            </AnimeSvg>
        );
    }

    return (
        <AnimeSvg
            width={totalWidth}
            height="20"
            style={{ margin: '0 0 2px 6px', fontSize: 12 }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
        >
            <defs>
                <clipPath id={id}>
                    <path
                        className={'clip-path'}
                        d={`M ${spentWidth} -10 L ${spentWidth} 30 L ${totalWidth * 2} 30 L ${
                            totalWidth * 2
                        } -10 Z`}
                        fill={cardBg}
                        transform={transform}
                    />
                </clipPath>
                <clipPath id={id1}>
                    <path
                        className={'clip-path'}
                        d={`M -${totalWidth} -10 H ${spentWidth} V 40 L ${-totalWidth} 30 Z`}
                        fill={cardBg}
                        transform={transform}
                    />
                </clipPath>
            </defs>

            <g clipPath={`url(#${id1})`}>
                <rect height={20} width={totalWidth - 50} x={50} rx={3} fill={barColor} />
                <text
                    x={4}
                    y={10}
                    textLength={sSpentTime.length * 6.2}
                    textAnchor={'start'}
                    alignmentBaseline={'central'}
                    fill={textColor}
                >
                    {sSpentTime}
                    <title>Spent Time</title>
                </text>

                <text
                    className={'label'}
                    x={totalWidth - 4}
                    y={10}
                    textLength={38}
                    textAnchor={'end'}
                    alignmentBaseline={'central'}
                    fill={textColor}
                >
                    SPENT
                </text>
            </g>

            <g clipPath={`url(#${id})`}>
                <rect
                    height={20}
                    width={totalWidth - 50}
                    x={0}
                    rx={3}
                    fill={exceeded ? '#EA6962' : leftBg}
                />
                <text
                    className={'label'}
                    x={4}
                    y={10}
                    textLength={30 + (exceeded ? 8 : 0)}
                    textAnchor={'start'}
                    alignmentBaseline={'central'}
                    fill={textColor}
                >
                    {exceeded ? 'EXTRA' : 'LEFT'}
                </text>
                <text
                    x={spentWidth + estimatedWidth - 4}
                    y={10}
                    textLength={sEstimatedTime.length * 6.2}
                    textAnchor={'end'}
                    alignmentBaseline={'central'}
                    fill={textColor}
                >
                    {sEstimatedTime}
                    <title>{exceeded ? 'Extra Time' : 'Left Time'}</title>
                </text>
            </g>
        </AnimeSvg>
    );
});
