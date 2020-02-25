import React from 'react';

function Logo() {
  return (
    <svg style={{marginBottom: -100 }} xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 640 480'>
    {/* <svg xmlns='http://www.w3.org/2000/svg' x='0' y='0' viewBox='0 0 640 480'> */}
      {/* <rect width='100%' height='100%' x='0' y='0' fill='#004f44'></rect> */}
      <g className='logo-container-box logoContainerBox'>
        <g className='containerBody'>
          <g className='sampleIconBox'>
            <g fill='#004f44' className='sampleIcons_1'>
              <path
                d='M53.977 27.282c4.021 0 5.567-1.703 7.271-3.404 1.702-1.702 8.511-7.581 4.487-9.902-4.023-2.32-7.755 2.655-7.755 2.655-.756 1.008-1.791.89-2.301-.262 0 0-3.867-8.736-8.201-8.736-4.333 0-4.176 7.891-5.879 8.819-1.702.928-6.449-3.529-8.509-.154-1.529 2.503.915 4.669.915 4.669a72.077 72.077 0 013.307 3.165s3.049 3.151 5.369 3.151l11.296-.001zM82.567 85.117s-6.003-20.238-8.014-33.699c-2.01-13.46-15.626-20.268-20.27-20.268h-8.687c-5.524 0-18.259 6.807-20.271 20.268-2.01 13.461-8.013 33.699-8.013 33.699-.358 1.207.264 2.669 1.383 3.247 0 0 6.064 3.128 29.71 3.356v-6.944c0-.642-.383-1.524-.853-1.962l-2.562-2.39c-.469-.438-.853-1.32-.853-1.962v-1.777c0-.641.397-.822.883-.404l4.034 3.484c.485.42 1.28.42 1.766.001l4.04-3.485c.485-.419.883-.236.883.404v1.777c0 .642-.384 1.524-.853 1.962l-2.562 2.39c-.47.438-.854 1.32-.854 1.962v6.958c25.666-.025 29.889-3.078 29.889-3.078 1.021-.738 1.563-2.331 1.204-3.539zM42.453 48.45c.062-.542.453-.698.87-.347l4.542 3.826c.417.352.759 1.086.759 1.631v3.633c0 .546-.335.697-.744.336 0 0-3.991-3.523-4.918-4.451-.926-.926-.509-4.628-.509-4.628zm6.1 26.463c0 .546-.334.696-.742.333 0 0-4.261-3.785-4.921-4.445-.658-.658-.449-4.625-.449-4.625.029-.545.394-.703.811-.352l4.542 3.826c.417.352.759 1.086.759 1.632v3.631zm.093-8.773c0 .546-.335.696-.744.336 0 0-4.004-3.533-4.919-4.447-.913-.914-.505-4.628-.505-4.628.06-.543.45-.699.867-.348l4.542 3.826c.417.352.759 1.085.759 1.631v3.63zm2.064-17.768c-.424.343-1.119.343-1.543 0l-2.051-1.66c-.424-.343-.564-1.019-.31-1.502l2.67-5.074c.254-.483.67-.483.924 0l2.672 5.074c.255.483.115 1.159-.31 1.502l-2.052 1.66zm6.132 22.429l-4.926 4.44c-.406.365-.737.218-.737-.328v-3.631c0-.546.341-1.28.759-1.632l4.541-3.826c.418-.352.82-.196.896.344 0 0 .519 3.685-.533 4.633zm-5.571-4.661v-3.63c0-.546.342-1.279.758-1.631l4.542-3.826c.417-.352.799-.194.847.35 0 0 .34 3.801-.484 4.626s-4.919 4.446-4.919 4.446c-.41.361-.744.211-.744-.335zm5.642-13.062l-4.927 4.443c-.404.365-.736.218-.736-.328V53.56c0-.545.342-1.279.759-1.631l4.541-3.826c.417-.352.81-.195.872.347 0 0 .432 3.78-.509 4.628z'
                transform='matrix(.75 0 0 .75 80 60) matrix(1.12 0 0 1.12 30.734 -28.8) matrix(1.18905 0 0 1.18905 80.892 180.924)'
              ></path>
            </g>
          </g>
          <g className='sampleTexts_1'>
            <path
              d='M14.26.65q-3.32 0-6.3-1.15Q4.97-1.66 3.1-3.89l2.88-3.89q1.8 1.73 3.78 2.67 1.98.93 3.92.93 2.38 0 3.89-.93 1.51-.94 1.51-2.88 0-1.51-.94-2.45-.93-.94-2.12-1.37-1.19-.43-4-1.29-7.63-2.45-7.63-8.72 0-3.74 2.77-6.4 2.78-2.67 7.74-2.67 3.17 0 5.62.79 2.45.8 4.54 2.52l-2.67 4.11q-1.15-1.23-2.91-1.95-1.77-.72-3.35-.79-2.02 0-3.46.97-1.44.98-1.44 2.63 0 1.37.94 2.27.93.9 1.94 1.3 1.01.39 3.96 1.33 3.67 1.22 5.73 3.17 2.05 1.94 2.05 5.25 0 4.32-3.03 7.13Q19.8.65 14.26.65zm55.72-30.46h6.63L62.86 1.8l-9.58-20.45L44.57 1.8 30.74-29.81h6.63l7.99 18.07L50.9-24.7l-2.37-5.11h5.83l8.06 18.51 7.56-18.51zm11.24 14.62q0-4.39 2.12-8.03 2.12-3.64 5.9-5.72 3.78-2.09 8.54-2.09 4.75 0 8.46 2.09 3.7 2.08 5.76 5.68 2.05 3.6 2.05 8.07 0 4.46-2.05 8.1-2.06 3.63-5.8 5.72Q102.46.72 97.63.72q-4.68 0-8.42-1.98-3.75-1.98-5.87-5.58t-2.12-8.35zm6.76.07q0 2.81 1.26 5.18 1.26 2.38 3.46 3.75t4.86 1.37q4.18 0 6.91-2.96 2.74-2.95 2.74-7.34t-2.74-7.38q-2.73-2.99-6.91-2.99-2.74 0-4.9 1.41-2.16 1.4-3.42 3.78-1.26 2.37-1.26 5.18zm32.48-.07q0-4.39 2.12-8.03 2.12-3.64 5.9-5.72 3.78-2.09 8.54-2.09 4.75 0 8.46 2.09 3.7 2.08 5.76 5.68 2.05 3.6 2.05 8.07 0 4.46-2.05 8.1-2.06 3.63-5.8 5.72Q141.7.72 136.87.72q-4.68 0-8.42-1.98-3.75-1.98-5.87-5.58t-2.12-8.35zm6.76.07q0 2.81 1.26 5.18 1.26 2.38 3.46 3.75t4.86 1.37q4.18 0 6.91-2.96 2.74-2.95 2.74-7.34t-2.74-7.38q-2.73-2.99-6.91-2.99-2.74 0-4.9 1.41-2.16 1.4-3.42 3.78-1.26 2.37-1.26 5.18zM170.71.65q-3.31 0-6.3-1.15-2.99-1.16-4.86-3.39l2.88-3.89q1.8 1.73 3.78 2.67 1.98.93 3.93.93 2.37 0 3.88-.93 1.52-.94 1.52-2.88 0-1.51-.94-2.45-.94-.94-2.12-1.37-1.19-.43-4-1.29-7.63-2.45-7.63-8.72 0-3.74 2.77-6.4 2.77-2.67 7.74-2.67 3.17 0 5.62.79 2.44.8 4.53 2.52l-2.66 4.11q-1.15-1.23-2.92-1.95-1.76-.72-3.35-.79-2.01 0-3.45.97-1.44.98-1.44 2.63 0 1.37.93 2.27.94.9 1.95 1.3 1.01.39 3.96 1.33 3.67 1.22 5.72 3.17 2.05 1.94 2.05 5.25 0 4.32-3.02 7.13-3.02 2.81-8.57 2.81zm39.46-31.61q4.17 0 6.91 2.48 2.74 2.49 2.81 6.45V0h-6.77v-19.73q-.14-2.52-1.51-3.96t-4.11-1.51q-2.59 0-4.68 1.44-2.08 1.44-3.27 4.03-1.19 2.59-1.19 5.76V0h-6.7v-55.8h6.56v31.39q1.65-2.95 4.78-4.75 3.14-1.8 7.17-1.8z'
              transform='matrix(.75 0 0 .75 80 60) matrix(1.12 0 0 1.12 30.734 -28.8) translate(0 28.8) translate(195.3 238.2)'
              className='0'
              fill='#004f44'
            ></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Logo;