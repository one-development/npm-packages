import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useDensity } from '../Card'
import Text from '../Text'
import px from '../utils/px'
import resets from '../utils/styleResets'
import showIf from '../utils/showIf'

const Root = styled.div(({ theme, styleProps }) => {
  const { density, hasAction, hasAvatar } = styleProps
  const actionOffsetRight = theme.space.custom(0.5)
  const actionOffsetTop = theme.space.custom(1.5)
  const avatarOffsetBottom = theme.space.custom(0.5)
  const avatarOffsetTop = theme.space.custom(0.5)
  const paddingBottom = theme.space.custom(1)

  const defaultPaddingY = theme.space.custom(4)
  const defaultPaddingX = theme.space.custom(3)

  const comfortablePaddingY = theme.space.custom(3.5)
  const comfortablePaddingX = theme.space.custom(2.5)

  const compactPaddingY = theme.space.custom(3)
  const compactPaddingX = theme.space.custom(2)

  const defaultPadding = {
    padding: `${defaultPaddingY} ${defaultPaddingX}`,
    paddingBottom,
    ...(hasAction && {
      paddingRight: `calc(${defaultPaddingX} - ${actionOffsetRight})`,
      paddingTop: `calc(${defaultPaddingY} - ${actionOffsetTop})`,
    }),
    ...(hasAvatar && {
      paddingBottom: `calc(${paddingBottom} + ${avatarOffsetBottom})`,
      paddingTop: `calc(${defaultPaddingY} - ${avatarOffsetTop})`,
    }),
    // eslint-disable-next-line sort-keys
    '&:only-child': {
      paddingBottom: defaultPaddingY,
    },
  }

  const comfortablePadding = {
    padding: `${comfortablePaddingY} ${comfortablePaddingX}`,
    paddingBottom,
    ...(hasAction && {
      paddingRight: `calc(${comfortablePaddingX} - ${actionOffsetRight})`,
      paddingTop: `calc(${comfortablePaddingY} - ${actionOffsetTop})`,
    }),
    ...(hasAvatar && {
      paddingBottom: `calc(${paddingBottom} + ${avatarOffsetBottom})`,
      paddingTop: `calc(${comfortablePaddingY} - ${avatarOffsetTop})`,
    }),
    // eslint-disable-next-line sort-keys
    '&:only-child': {
      paddingBottom: comfortablePaddingY,
    },
  }

  const compactPadding = {
    padding: `${compactPaddingY} ${compactPaddingX}`,
    paddingBottom,
    ...(hasAction && {
      paddingRight: `calc(${compactPaddingX} - ${actionOffsetRight})`,
      paddingTop: `calc(${compactPaddingY} - ${actionOffsetTop})`,
    }),
    ...(hasAvatar && {
      paddingBottom: `calc(${paddingBottom} + ${avatarOffsetBottom})`,
      paddingTop: `calc(${compactPaddingY} - ${avatarOffsetTop})`,
    }),
    // eslint-disable-next-line sort-keys
    '&:only-child': {
      paddingBottom: compactPaddingY,
    },
  }

  return {
    ...resets,
    ...defaultPadding,
    ...(density === 'default' && defaultPadding),
    ...(density === 'comfortable' && comfortablePadding),
    ...(density === 'compact' && compactPadding),
    ...(density === 'responsive' && {
      ...compactPadding,
      [theme.breakpoints.above('sm')]: comfortablePadding,
      [theme.breakpoints.above('md')]: defaultPadding,
    }),
    alignItems: 'center',
    display: 'flex',
  }
})

const Action = styled.div({
  flex: '0 0 auto',
})

const Avatar = styled.div(({ theme }) => ({
  ...resets,
  flex: '0 0 auto',
  marginRight: theme.space.md,
}))

const Content = styled.div(({ theme }) => ({
  flex: '1 1 auto',
  marginTop: `-${theme.space.xs}`, // Remove extra space
  overflow: 'hidden',
  padding: theme.space.custom(0.5, 0), // Fix overflow hidden clipping
  transform: `translateY(${px.toNumber(theme.space.xs) / 2}px)`, // Remove extra space
}))

const Subtitle = styled.div(({ theme }) => ({
  marginTop: theme.space.sm,
}))

const CardHeader = forwardRef(function CardHeader(props, ref) {
  // prettier-ignore
  const {
    action,
    as,
    avatar,
    className,
    subtitle,
    title,
    ...rest
  } = props

  const density = useDensity()

  if (!density)
    throw new Error('CardHeader was rendered outside of a Card component')

  return (
    <Root
      {...rest}
      as={as}
      className={className}
      ref={ref}
      styleProps={{
        density,
        hasAction: Boolean(action),
        hasAvatar: Boolean(avatar),
      }}
    >
      {/* Avatar */}
      {showIf(avatar)(<Avatar>{avatar}</Avatar>)}

      {/* Content */}
      <Content>
        {showIf(title)(
          <Text truncate variant='h2'>
            {title}
          </Text>
        )}
        {showIf(subtitle)(
          <Subtitle
            as={Text}
            color='onSurface.secondary'
            truncate
            variant='body'
          >
            {subtitle}
          </Subtitle>
        )}
      </Content>

      {/* Action */}
      {showIf(action)(<Action>{action}</Action>)}
    </Root>
  )
})

CardHeader.displayName = 'CardHeader'
CardHeader.defaultProps = {}
CardHeader.propTypes = {
  /**
   * The action to display in the card header. Generally an icon button.
   */
  action: PropTypes.node,
  /**
   * The component used for the root node
   * (either a string to use as DOM element or a React component)
   */
  as: PropTypes.elementType,
  /**
   * The avatar or icon to display in the Card's header.
   * Should use a component that is roughly 40px X 40px in size.
   */
  avatar: PropTypes.node,
  className: PropTypes.string,
  /**
   * Sets the subtitle below the title. Should be plain text.
   */
  subtitle: PropTypes.string,
  /**
   * Sets the title. Should be plain text.
   */
  title: PropTypes.string,
}

export default CardHeader
