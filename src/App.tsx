import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'
import SeriesPage from './pages/SeriesPage'
import StudyPage from './pages/StudyPage'
import ProgressPage from './pages/ProgressPage'

function App() {
  return (
    <div className="min-h-screen bg-learn-50 font-body text-learn-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/subject/:subjectId" element={<SubjectPage />} />
        <Route path="/subject/:subjectId/:categoryId" element={<SeriesPage />} />
        <Route path="/study/:subjectId/:categoryId/:seriesId" element={<StudyPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </div>
  )
}

export default App
