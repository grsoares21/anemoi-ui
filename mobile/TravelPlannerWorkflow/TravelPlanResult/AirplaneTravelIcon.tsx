import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg viewBox="65 0 90 90" {...props}>
      <Path
        d="M181.554 32.272h-21.61c-4.906 0-8.898-3.993-8.898-8.898 0-4.906 3.992-8.899 8.898-8.899.487 0 .97.04 1.449.119 1.772-4.616 6.242-7.746 11.263-7.746 5.075 0 9.64 3.243 11.353 7.973a8.913 8.913 0 016.443 8.553c0 4.905-3.993 8.898-8.898 8.898z"
        fill="#25ccf7"
      />
      <Path
        d="M188.65 48.382a32.341 32.341 0 00-14.394-3.398h-16.028l-14.407-10.17h-12.37l10.17 10.17h-10.432l-11.44-10.17h-7.525l5.037 11.334-1.809.302v4.272l.812.581a34.13 34.13 0 0019.95 6.393h2.865l-9.302 9.301 1.3.858c.405.268.787.577 1.136.918l.37.363h7.426l16.207-11.44h17.72c4.385 0 8.651-.876 12.68-2.603l1.86-.797a3.26 3.26 0 001.976-2.997c0-1.243-.69-2.36-1.802-2.917zm-51.062-11.025h5.427l10.805 7.627h-8.604zm-21.45 0h2.645l8.58 7.627h-1.75c-.908 0-1.822.076-2.717.225l-3.044.507zm71.337 14.602l-1.86.797a29.459 29.459 0 01-11.678 2.397h-14.119l2.13-1.503-1.466-2.077-21.28 15.021h-5.427l13.084-13.084-1.797-1.797-3.441 3.44h-5.408a31.605 31.605 0 01-18.219-5.74v-.81l5.32-.887c.758-.126 1.532-.19 2.299-.19h48.643a29.79 29.79 0 0113.256 3.129.718.718 0 01-.037 1.304z"
        fill="#6c757f"
        fillOpacity={0.941}
      />
      <Path
        d="M134.52 84.39h-15.254c-4.207 0-7.627-3.42-7.627-7.626 0-3.735 2.75-6.898 6.382-7.497 1.788-3.19 5.193-5.215 8.872-5.215 4.833 0 8.972 3.418 9.946 8.077a6.327 6.327 0 014.037 5.906 6.363 6.363 0 01-6.356 6.356z"
        fill="#25ccf7"
      />
    </Svg>
  );
}

export default SvgComponent;