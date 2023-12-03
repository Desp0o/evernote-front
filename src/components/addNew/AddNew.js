import React, { useState, useContext } from 'react'
import addNewStyles from "./AddNew.module.css"
import ShortCutElemen from '../ShortCutElement/ShortCutElemen'

import addIco from "../../utils/icons/add.webp"
import dropDownArrow from "../../utils/icons/down-arrow.webp"
import checkedIco from "../../utils/icons/checked.webp"
import notes from "../../utils/icons/notes.webp"
import { ProviderPass } from '../Provider'

export default function AddNew() {
  const {CreateTaksHandler, closeAllTaskElements, setSideBarHandler} = useContext(ProviderPass)

  const [dashClas, setDashClass] = useState(addNewStyles.add_dashbouard)

  const dashTrigger = () => {
    setDashClass(`${addNewStyles.add_dashbouard} ${addNewStyles.add_dashbouard_visible}` )
  }

  const resetDashTrigger = () => {
    setDashClass(addNewStyles.add_dashbouard)
  }

  return (
    <div className={addNewStyles.add_new}>

        <div >
          <ShortCutElemen cName='shortCut_element' firsIco={addIco} text='New' secIco={dropDownArrow} funName={dashTrigger}/>
        </div>
        
        <div className={dashClas} onMouseLeave={resetDashTrigger}>
          <ShortCutElemen 
              cName={'shortCut_element'} 
              firsIco={notes} text='Notes' 
              linkName='/pages/CreateNote'
              funName={()=>{setSideBarHandler(false)}}
          />


          <ShortCutElemen 
              cName='shortCut_element_task' 
              firsIco={checkedIco} 
              text='Task'
              funName={()=>{closeAllTaskElements(); CreateTaksHandler(); setSideBarHandler(false)}}
          />

        </div>

        
    </div>
  )
}
