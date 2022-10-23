import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    menu?: Palette['primary'];
  }

  interface PaletteOptions {
    menu?: PaletteOptions['primary'];
  }
}
