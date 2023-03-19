import "./style.scss"
import { useDatabase } from "../../context/DatabaseProvider/useDatabase"
import { Button } from "@mui/material"
import { CaretLeft } from "phosphor-react"
import { useNavigate, useParams } from "react-router-dom"
import html2canvas from "html2canvas"


export function CoursesMonth(){
  const { courseList } = useDatabase();
  const navigate = useNavigate();
  const {idParamsUnity} = useParams();

  async function downloadImage(){
    const screenshotTarget = document.getElementById("CourseMonth")
    console.log(screenshotTarget)
    await html2canvas(screenshotTarget).then(canvas => {
      const base64image = canvas.toDataURL("image/png");
      var anchor = document.createElement("a");
      anchor.setAttribute("href", base64image);
      anchor.setAttribute("download", `planilha de cursos ${courseList[0].month}.png`);
      anchor.click();
      anchor.remove()
    })
  }

  return(
    <>
    <div className="containerCourseMonth">
      <div className="backButtonCourseMounth" onClick={() => navigate(`/${idParamsUnity}/adm/course`)}>
        <CaretLeft size={32} weight="fill" />
        <span>Voltar</span>
      </div>
      <div id="CourseMonth" style={{display: "flex", justifyContent: "center", alignItems:"center", width: "100%"}}>
        <table style={{width: "100%", margin:"0 10% 0 10%"}}>
          <thead>
            <tr>
              <th colSpan={4}>Planilha de curso do mês de {courseList[0].month}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center" bgcolor="#bababa">Data</td>
              <td align="center" bgcolor="#bababa">Horário</td>
              <td align="center" bgcolor="#bababa">Investimento</td>
              <td align="center" bgcolor="#bababa">Oficina</td>
            </tr>
            {courseList.map((course) => {
              return(
                <tr key={course.id}>
                  <td align="center">{course.day}/{course.month}</td>
                  <td align="center">{course.schedule}H</td>
                  <td align="center">R$ {course.price}</td>
                  <td align="center">{course.organizer} - tema: {course.name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <Button variant="contained" className="buttonCoursesMonth" onClick={downloadImage}>Download</Button>
    </div>
    </>
  )
}