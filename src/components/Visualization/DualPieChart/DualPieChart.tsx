import { EChartOption } from 'echarts';
import ReactEcharts from 'echarts-for-react';
import * as React from 'react';

const getCssVar = (name: string, fallback: string) => {
    if (typeof document === 'undefined') {
        return fallback;
    }
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
};

export interface Props {
    width?: number;
    projectData: { name: string; value: number }[];
    appData: { name: string; value: number }[];
    onProjectClick?: (project: string) => void;
    themeName?: string;
}

function getOption(props: Props): EChartOption {
    const isDark = props.themeName === 'dark';
    const textColor = getCssVar('--pl-text', isDark ? '#D4BE98' : '#1f1f1f');
    const cardBg = getCssVar('--pl-card-bg', isDark ? '#282828' : '#ffffff');
    const border = getCssVar('--pl-border', isDark ? '#504945' : '#c7c7c7');
    const accent = getCssVar('--pl-accent', '#7DAEA3');
    const subtle = getCssVar('--pl-text-muted', isDark ? '#928374' : '#777777');
    const appBg = getCssVar('--pl-bg', isDark ? '#1D2021' : '#ffffff');
    const option: EChartOption = {
        backgroundColor: appBg,
        textStyle: { color: textColor },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            backgroundColor: cardBg,
            borderColor: border,
            textStyle: { color: textColor },
        },
        legend: {
            orient: 'vertical',
            // @ts-ignore
            x: 'left',
            data: props.appData.map((v) => v.name).concat(props.projectData.map((v) => v.name)),
            textStyle: { color: textColor },
        },
        series: [
            {
                name: 'Project Hours',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner',
                        color: textColor,
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: props.projectData,
            },
            {
                name: 'Application Hours',
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: cardBg,
                        borderColor: border,
                        borderWidth: 1,
                        borderRadius: 4,
                        rich: {
                            a: {
                                color: subtle,
                                lineHeight: 22,
                                align: 'center',
                            },
                            hr: {
                                borderColor: border,
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0,
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33,
                                color: textColor,
                            },
                            per: {
                                color: cardBg,
                                backgroundColor: accent,
                                padding: [2, 4],
                                borderRadius: 2,
                            },
                        },
                    },
                },
                data: props.appData,
            },
        ],
    };

    return option;
}

export const DualPieChart: React.FC<Props> = (props: Props) => {
    const [option, setOption] = React.useState(getOption(props));
    const { width = 800 } = props;
    const chartBg = getCssVar('--pl-bg', props.themeName === 'dark' ? '#1D2021' : '#ffffff');
    React.useEffect(() => {
        setOption(getOption(props));
    }, [props.appData, props.projectData, props.themeName]);
    return (
        <ReactEcharts
            key={`dual-${props.themeName}`}
            option={option}
            lazyUpdate={true}
            notMerge={true}
            style={{ width, height: 400, background: chartBg }}
        />
    );
};
