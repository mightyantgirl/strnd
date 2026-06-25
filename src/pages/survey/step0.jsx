import Input from './../../components/input'
import Dropdown from './../../components/dropdown'
import CheckChip from './../../components/checkchip'

const baseTextClass = `text-xs text-primary font-bold`

export default function SurveyStep0({ surveyData, onUpdate, isFirstVisit }) {
  const VISIT_ROUTE_OPTIONS = [
    { value: 'naver', label: '네이버 검색' },
    { value: 'instagram', label: '인스타그램' },
    { value: 'friend', label: '지인 소개' },
    ...(!isFirstVisit ? [{ value: 'revisit', label: '재방문' }] : []),
    { value: 'other', label: '기타' },
  ]

  return (
    <div>
      <div>
        {/* 컨텐츠 - 메인타이틀 */}
        <div className={`${baseTextClass} pt-18 pb-8 space-y-2`}>
          <p>STEP 0</p>
          <h1 className="text-2xl font-bold text-primary mb-4">
            고객님의 간단한 정보를 <br />
            입력해주세요.
          </h1>
        </div>

        {/* 컨텐츠 - 설문 영역 */}
        <div className="space-y-8">
          <div>
            <div className="w-full flex text-lg">
              <CheckChip
                label="💁‍♂️남성"
                selected={surveyData.gender === 'MALE'}
                onClick={() => onUpdate('gender', 'MALE')}
              />
              <CheckChip
                label="💁‍♀️여성"
                selected={surveyData.gender === 'FEMALE'}
                onClick={() => onUpdate('gender', 'FEMALE')}
              />
            </div>
            <p className="text-xs font-medium text-placeholder">필수 선택 요소입니다.</p>
          </div>
          <Dropdown
            options={VISIT_ROUTE_OPTIONS}
            value={surveyData.visitRoute}
            onChange={(val) => onUpdate('visitRoute', val)}
            placeholder="해당하는 항목을 선택해주세요"
            label="방문경로"
            required={true}
          />
          <Input
            label="소개 유무"
            placeholder="소개해 주신 분 성함을 알려주세요."
            value={surveyData.refDesigner}
            onChange={(e) => onUpdate('refDesigner', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
