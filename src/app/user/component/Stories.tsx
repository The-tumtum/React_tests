"use client"
import Image from "next/image";
import { useState } from "react";

let id:(number | NodeJS.Timeout | undefined) = undefined;
let afterid:(number | NodeJS.Timeout | undefined) = undefined;
let sec = 1;
let division = 25;
let part = 1;
export function Strories (param:StoriesProps){
    const height = param.HeightWidth;
    const width = param.HeightWidth;
    const thickness = param.PathThickness;
    const imageURL = param.imageURL;
    const color = ['black','gray'] // ['#881337','#fb7185']

    const [animateProp, setAnimateProp] = useState({
        pathmargin:'0',
        strokewidth:'0',
        circleradius:'0',
        imageHight:height.toString(),
        imageWidth:width.toString(),
        imagetranslate:'0'
    })
    function animate(){
        id = setInterval(()=>{
            if(part === (division*sec+1)){
                return clearInterval(id)
            }else{
            setAnimateProp((state)=>{
                return {
                    ...state,
                    pathmargin:((thickness/2)*(part/(division*sec))).toString(),
                    strokewidth:(thickness*(part/(division*sec))).toString(),
                    circleradius:((thickness/2)*(part/(division*sec))).toString(),
                    imageHight:(height-((thickness*2)*(part/(division*sec)))).toString(),
                    imageWidth:(width-((thickness*2)*(part/(division*sec)))).toString(),
                    imagetranslate:(thickness*(part/(division*sec))).toString()
                }
            })
            part++
        }
        },4)

       let vd = setTimeout(()=>{
        afterid = setInterval(()=>{
            if(part === (0)){
                return clearInterval(afterid)
            }else{
            setAnimateProp((state)=>{
                return {
                    ...state,
                    pathmargin:((thickness/2)*(part/(division*sec))).toString(),
                    strokewidth:(thickness*(part/(division*sec))).toString(),
                    circleradius:((thickness/2)*(part/(division*sec))).toString(),
                    imageHight:(height-((thickness*2)*(part/(division*sec)))).toString(),
                    imageWidth:(width-((thickness*2)*(part/(division*sec)))).toString(),
                    imagetranslate:(thickness*(part/(division*sec))).toString()
                }
            })
            part--
        }
        },4)
       },4000)
    }
    return (
        <div>
        <button onClick={animate} className="flex relative">
            <div className={`h-[${height.toString()}px] w-[${width.toString()}px]`}>
            <svg height={height.toString()} width={width.toString()}>
                <g>
                    <path d={`M ${animateProp.pathmargin} ${(height/2).toString()}
                     a ${((height/2) - parseFloat(animateProp.pathmargin)).toString()} ${((width/2) - parseFloat(animateProp.pathmargin)).toString()} 0 0 1
                     ${((width/2) - parseFloat(animateProp.pathmargin)).toString()} -${((height/2) - parseFloat(animateProp.pathmargin)).toString()}`} stroke={color[0]} strokeWidth={animateProp.strokewidth} fill="none"/>
                    <circle cx={(thickness/2).toString()} cy={(height/2).toString()} r={animateProp.circleradius} fill={color[0]}/>
                    <circle cx={(width/2).toString()} cy={(thickness/2).toString()} r={animateProp.circleradius} fill={color[0]}/>
                    <animateTransform
                        attributeName="transform"
                        begin={`0s`}
                        dur={`8s`}
                        type="rotate"
                        from={`0 ${(height/2).toString()} ${(width/2).toString()}`}
                        to={`360 ${(height/2).toString()} ${(width/2).toString()}`}
                        repeatCount={`indefinite`}
                    />
                </g>
                <g>
                    <defs>
                        <mask id="cut-circle">
                        <rect x={`0`} y={`0`} height={height.toString()} width={width.toString()} fill="white"/>
                        <circle cx={(thickness/2).toString()} cy={(height/2).toString()} r={animateProp.circleradius} fill="black"/>
                        <circle cx={(width/2).toString()} cy={(thickness/2).toString()} r={animateProp.circleradius} fill="black"/>
                        </mask>
                    </defs>
                    <path d={`M ${animateProp.pathmargin} ${(height/2).toString()}
                     a ${((height/2) - parseFloat(animateProp.pathmargin)).toString()} ${((width/2) - parseFloat(animateProp.pathmargin)).toString()} 0 1 0
                     ${((width/2) - parseFloat(animateProp.pathmargin)).toString()} -${((height/2) - parseFloat(animateProp.pathmargin)).toString()}`} stroke={color[1]} strokeWidth={animateProp.strokewidth} mask="url(#cut-circle)" fill="none"/>
                    <animateTransform
                        attributeName="transform"
                        begin={`0s`}
                        dur={`8s`}
                        type="rotate"
                        from={`0 ${(height/2).toString()} ${(width/2).toString()}`}
                        to={`360 ${(height/2).toString()} ${(width/2).toString()}`}
                        repeatCount={`indefinite`}
                    />
                </g>
            </svg>
            </div>
            <div className={`absolute border-2 border-slate-600 
              rounded-full overflow-hidden flex`} style={{height:`${animateProp.imageHight}px`,width:`${animateProp.imageWidth}px`,
               transform:`translate(${animateProp.imagetranslate}px,${animateProp.imagetranslate}px)`}}>
                <Image src={imageURL} alt="" height={height} width={width}/>
            </div>
        </button>
        </div>
    )
}