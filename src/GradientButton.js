import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { color, fontSize, borderRadius, textAlign } from 'styled-system';

import { getGradientColors } from './gradients';

const getLinearGradient = name => {
  const [firstColor, ...elseColors] = getGradientColors(name);
  const elseColorsLength = elseColors.length;
  let str = '';

  for (let i = 0; i < elseColorsLength; i += 1) {
    str = `${str}, ${elseColors[i]} ${100 / elseColorsLength * (i + 1)}%`;
  }

  return `${firstColor} 0% ${str}`;
};

const GradientBackground = styled.button`
  position: relative;
  display: flex;
  box-sizing: border-box;
  padding: ${props => props.borderWith}px;
  border: 0;
  outline: 0;
  background-image: linear-gradient(
    to right,
    ${props => getLinearGradient(props.gradient)}
  );
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  ${borderRadius};
  ${color};
  ${fontSize};
  ${textAlign};

  text-decoration: none;
`;

GradientBackground.propTypes = {
  borderWith: PropTypes.number.isRequired,
  gradient: PropTypes.string.isRequired,
  ...borderRadius.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...textAlign.propTypes,
};

GradientBackground.defaultProps = {
  color: '#000',
  fontSize: 16,
  textAlign: 'center',
};

const Inner = styled.div`
  width: 100%;
  height: 100%;
  padding: ${props => props.padding}px;
  outline: 0;
  background: #fff;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: transparent;
    color: #fff;
  }

  ${borderRadius};
`;

Inner.propTypes = {
  padding: PropTypes.number.isRequired,
  ...borderRadius.propTypes,
};

const GradientButton = ({
  borderRadius: _borderRadius,
  borderWith,
  content,
  gradient,
  padding,
  ...props
}) => (
  <GradientBackground
    gradient={gradient}
    borderRadius={_borderRadius}
    borderWith={borderWith}
    {...props}
  >
    <Inner borderRadius={_borderRadius - (borderWith + 1)} padding={padding}>
      {content}
    </Inner>
  </GradientBackground>
);

GradientButton.propTypes = {
  borderRadius: PropTypes.number,
  borderWith: PropTypes.number,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  gradient: PropTypes.string,
  padding: PropTypes.number,
};

GradientButton.defaultProps = {
  borderRadius: 20,
  borderWith: 2,
  gradient: 'Vanusa',
  padding: 10,
};

export default GradientButton;