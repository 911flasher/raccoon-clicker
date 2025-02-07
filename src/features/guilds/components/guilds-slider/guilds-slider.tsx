import { FC, useCallback, useEffect, useMemo, useRef } from 'react'

import { EmblaCarouselType, EmblaEventType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'

import { useAppDispatch, useAppSelector } from 'core/store/hooks'
import { sleep } from 'core/utils/sleep'

import { SLIDER_CONTENT_CLASS, slides, TWEEN_FACTOR_BASE } from './constants'
import styles from './styles.module.scss'
import { getGuildByIndex, getIndexByGuild, getNeighbourGuilds, numberWithinRange } from './utils'
import { Guild } from '../../constants'
import { getGuildLeaders } from '../../store/actions/leaders'
import { selectGuildsState } from '../../store/selectors'
import { GuildLogo } from '../guild-logo'

interface Props {
  onSelectGuild: (guild: Guild) => void
}

export const GuildsSlider: FC<Props> = ({ onSelectGuild }) => {
  const { currentGuild } = useAppSelector(selectGuildsState)

  const options = useMemo(() => {
    return {
      containScroll: false as const,
      startIndex: getIndexByGuild(currentGuild),
    }
  }, [currentGuild])

  const [sliderRef, sliderApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const dispatch = useAppDispatch()

  const setTweenNodes = useCallback((api: EmblaCarouselType): void => {
    tweenNodes.current = api.slideNodes().map((slideNode) => {
      return slideNode.querySelector(`.${SLIDER_CONTENT_CLASS}`) as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((api: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * api.scrollSnapList().length
  }, [])

  const tweenScale = useCallback((api: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = api.internalEngine()
    const scrollProgress = api.scrollProgress()
    const slidesInView = api.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress)
              }

              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress)
              }
            }
          })
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
        const scale = numberWithinRange(tweenValue, 0, 1).toString()
        const tweenNode = tweenNodes.current[slideIndex]
        tweenNode.style.transform = `scale(${scale})`
      })
    })
  }, [])

  const logSlidesInViewOnce = useCallback(
    async (api: EmblaCarouselType) => {
      const slidesInView = api.slidesInView()
      const mainSlide = api.selectedScrollSnap()
      const otherSlides = slidesInView.filter((slide) => slide !== mainSlide)

      const mainGuild = getGuildByIndex(mainSlide)
      onSelectGuild(mainGuild)

      void dispatch(getGuildLeaders(mainGuild))
      await sleep(100)

      otherSlides.forEach((slide) => {
        void dispatch(getGuildLeaders(getGuildByIndex(slide)))
      })
    },
    [dispatch, onSelectGuild],
  )

  useEffect(() => {
    void dispatch(getGuildLeaders(currentGuild))

    const list = getNeighbourGuilds(options.startIndex)
    list.forEach((guild) => {
      void dispatch(getGuildLeaders(guild))
    })
  }, [dispatch, currentGuild, options.startIndex])

  useEffect(() => {
    if (sliderApi) {
      // sliderApi.on('init', logSlidesInViewOnce)
      sliderApi.on('select', logSlidesInViewOnce)
    }

    return () => {
      if (sliderApi) {
        // sliderApi.off('init', logSlidesInViewOnce)
        sliderApi.off('select', logSlidesInViewOnce)
      }
    }
  }, [sliderApi, logSlidesInViewOnce])

  useEffect(() => {
    if (!sliderApi) return

    setTweenNodes(sliderApi)
    setTweenFactor(sliderApi)
    tweenScale(sliderApi)

    sliderApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('slideFocus', tweenScale)
  }, [sliderApi, setTweenFactor, setTweenNodes, tweenScale])

  return (
    <div>
      <div className={styles.sliderContainer}>
        <div className={styles.viewport} ref={sliderRef}>
          <div className={styles.innerContainer}>
            {slides.map((item) => (
              <div key={item} className={styles.slide}>
                <GuildLogo guild={item} className={SLIDER_CONTENT_CLASS} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
