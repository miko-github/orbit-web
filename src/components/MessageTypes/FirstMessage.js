'use strict'

import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

function FirstMessage ({ loading, hasMoreHistory, channelName, observed, ...rest }) {
  const [t] = useTranslation()
  const firstMessage = useRef()

  const onObserve = async () => {
    !loading && hasMoreHistory && (await observed())
  }
  const observer = IntersectionObserver && new IntersectionObserver(onObserve, {})
  useEffect(
    () =>
      observer && firstMessage && firstMessage.current && observer.observe(firstMessage.current),
    []
  )
  return (
    <div className={classNames('firstMessage', { hasMoreHistory })} ref={firstMessage} {...rest}>
      {loading
        ? t('channel.loadingHistory')
        : hasMoreHistory
          ? t('channel.loadMore', { channel: channelName })
          : t('channel.beginningOf', { channel: channelName })}
    </div>
  )
}

FirstMessage.propTypes = {
  loading: PropTypes.bool.isRequired,
  hasMoreHistory: PropTypes.bool.isRequired,
  channelName: PropTypes.string.isRequired,
  observed: PropTypes.func
}

export default FirstMessage
