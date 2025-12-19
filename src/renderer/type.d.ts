import type { ExposedAPI } from '../main/ipc/type';
import 'styled-components';
import type { AppTheme } from './style/theme';

declare module 'styled-components' {
    // tslint:disable-next-line:no-empty-interface
    export interface DefaultTheme extends AppTheme {}
}

declare global {
    interface Window {
        api: ExposedAPI;
    }
}
