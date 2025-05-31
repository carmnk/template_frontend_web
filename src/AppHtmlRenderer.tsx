import React, { useCallback, useEffect } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import {
  BASE_ELEMENT_MODELS,
  ElementModel,
  HtmlRenderer,
  useEditorRendererController,
} from '@cmk/fe_utils'
import axios from 'axios'

declare const BASE_URL: string

export type AppHtmlRendererProps = {
  appData: any
  // mdiIcons: Record<string, string>
}

export const AppHtmlRenderer = (props: AppHtmlRendererProps) => {
  const { appData } = props

  const {
    editorState,
    // selectedElement,
    setEditorState,
    currentViewportElements,
    allElements,
    appController,
  } = useEditorRendererController({
    initialEditorState: appData,
  })

  const [iconData, setIconData] = React.useState<Record<string, string>>({})
  const [ui, setUi] = React.useState<any>({ initialized: false })
  useEffect(() => {
    const basePath = window.location.href ?? '/'

    const fetchIconData = async () => {
      try {
        console.log('fetching icon data, basepath="', basePath + '"')
        const url = `${basePath || '/'}mdi_icons.json`
        const response = await axios.get(url)
        const data = response.data
        if (!data) {
          throw new Error('No data found')
        }
        console.log('response', response, data)
        const iconData = data
        setIconData(iconData)
      } catch (e) {
        console.error('error', e)
      }
      setUi((prev: any) => ({
        ...prev,
        initialized: true,
      }))
    }
    fetchIconData()
  }, [])

  const getIcon = useCallback(
    async (name: string) => {
      if (!iconData[name]) {
        console.warn('getIcon', name, 'not found')
        return null
      }
      return iconData[name]
    },
    [iconData]
  )

  const navigateRaw = useNavigate()
  const navigate = useCallback(
    (to: string) => {
      const toAdj = to.startsWith('/') ? to.slice(1) : to
      const distination = BASE_URL + toAdj
      console.log('navigate', to, 'toAdj', toAdj, 'distination', distination)
      navigateRaw(distination)
    },
    [navigateRaw]
  )
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const forcedLocation = searchParams.get('location')

  const theme = editorState.theme
  // const amountSlashedInPathNameRaw = location.pathname.matchAll(/\//g)
  // const amountSlashedInPathName = amountSlashedInPathNameRaw
  //   ? [...amountSlashedInPathNameRaw].filter((val) => val).length
  //   : 0

  const adjPathName = forcedLocation
    ? forcedLocation
    : location.pathname === '/'
    ? 'index'
    : location.pathname.replace(BASE_URL, '') || 'index'

  // useEffect(() => {
  //   setEditorState((current) => ({
  //     ...current,
  //     ui: {
  //       ...current.ui,
  //       selected: { ...current.ui.selected, page: adjPathName },
  //     },
  //   }))
  // }, [adjPathName])

  return ui.initialized ? (
    <HtmlRenderer
      allElements={allElements}
      uiActions={null as any}
      editorState={editorState}
      setEditorState={setEditorState}
      currentViewportElements={currentViewportElements}
      appController={appController}
      // actions={actions}

      ELEMENT_MODELS={BASE_ELEMENT_MODELS as ElementModel[]}
      OverlayComponent={null as any}
      navigate={navigate}
      pageName={adjPathName}
      theme={theme}
      isProduction
      importIconByName={getIcon as any}
    />
  ) : null
}
