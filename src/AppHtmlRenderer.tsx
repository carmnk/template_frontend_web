import React, { useCallback, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  BASE_ELEMENT_MODELS,
  ElementModel,
  HtmlRenderer,
  useEditorRendererController,
} from '@cmk/fe_utils'
import axios from 'axios'

export type AppHtmlRendererProps = {
  appData: any
  mdiIcons: Record<string, string>
}

export const AppHtmlRenderer = (props: AppHtmlRendererProps) => {
  const { appData } = props

  const {
    editorState,
    // selectedElement,
    setEditorState,
    currentViewportElements,
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
        console.log('fetching icon data', basePath)
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

  const navigate = useNavigate()
  const location = useLocation()
  const theme = editorState.theme
  const adjPathName =
    location.pathname === '/'
      ? 'index'
      : location.pathname.startsWith('/')
      ? location.pathname.slice(1)
      : location.pathname

  console.log('PATH', adjPathName)

  useEffect(() => {
    setEditorState((current) => ({
      ...current,
      ui: {
        ...current.ui,
        selected: { ...current.ui.selected, page: adjPathName },
      },
    }))
  }, [adjPathName])

  return ui.initialized ? (
    <HtmlRenderer
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
