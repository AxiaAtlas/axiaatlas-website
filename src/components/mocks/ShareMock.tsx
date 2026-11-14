'use client'
/* SHARE. A share link is made for the report, "Can view" is chosen, and Copy
   is pressed. */
import MockFrame, { Pointer, useTargets, type Waypoint } from './MockFrame'
import { useScene, seg, typed, rise } from './scene'
import { CO, DECK_TITLE, SAMPLE } from './data'

const CREATE = 1500
const LINK = 'app.axiaatlas.com/s/kova-october'
const OPEN = 2900
const PICK = 3900
const COPY = 5000
const END = 6800
const PATH: Waypoint[] = [
  { at: CREATE, to: 'create', click: true },
  { at: OPEN, to: 'access', click: true },
  { at: PICK, to: 'view', click: true },
  { at: COPY, to: 'copy', click: true },
]

export default function ShareMock({ className = '' }: { className?: string }) {
  const scene = useScene(END)
  const { t } = scene
  const targets = useTargets(scene.ref)
  const made = t >= CREATE + 100
  const menu = t >= OPEN + 80 && t < PICK + 120
  const access = t >= PICK + 80 ? 'Can view' : 'Can edit'
  const copied = t >= COPY + 80

  return (
    <MockFrame
      scene={scene}
      className={`mk-share ${className}`}
      desc={`Share, played on sample data. In the share dialog for the ${DECK_TITLE}, a link is created, its access is set to Can view, and Copy is pressed. The link is copied: anyone with it can view the report.`}
    >
      <div className="mk-app">
        <div className="mk-share-bg">
          <div className="sl sl-cover">
            <div className="sl-kicker">{CO}</div>
            <div className="sl-title sl-title-xl">{DECK_TITLE}</div>
            <div className="sl-foot"><span>{SAMPLE}</span><span>01</span></div>
          </div>
        </div>
        <div className="mk-scrim" />
        <div className="mk-dialog">
          <div className="mk-dialog-head">
            <div className="mk-kicker">Share</div>
            <div className="mk-dialog-title">{DECK_TITLE}</div>
          </div>
          <div className="mk-dialog-sec">
            <div className="mk-sec-label">People</div>
            <div className="mk-person"><span className="mk-av">MC</span><span className="mk-pname">Maya Chen<em>Head of investor relations</em></span><span className="mk-role">Can edit</span></div>
            <div className="mk-person"><span className="mk-av">JR</span><span className="mk-pname">Jordan Reyes<em>Board</em></span><span className="mk-role">Can view</span></div>
          </div>
          <div className="mk-dialog-sec">
            <div className="mk-sec-label">Link</div>
            <div className="mk-linkrow">
              <div className="mk-linkfield">
                {made
                  ? <span className="mk-url">{typed(LINK, t, CREATE + 150, 48)}<span className="ghost">{LINK.slice(typed(LINK, t, CREATE + 150, 48).length)}</span></span>
                  : <span className="mk-ph">No link yet</span>}
                <span className={`mk-btn mk-create${t >= CREATE - 80 ? ' pressed' : ''}`} data-target="create" style={{ opacity: 1 - seg(t, CREATE + 50, CREATE + 250) }}>Create link</span>
              </div>
              <span className={`mk-select${made ? '' : ' off'}`} data-target="access">{access}<svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg></span>
              <span className={`mk-btn mk-btn-ink${made ? '' : ' off'}${copied ? ' done' : ''}${t >= COPY - 80 && t < COPY + 120 ? ' pressed' : ''}`} data-target="copy">{copied ? 'Copied' : 'Copy link'}</span>
              <div className="mk-menu" style={{ opacity: menu ? 1 : 0, transform: menu ? 'none' : 'translateY(-4px)' }}>
                <span className={`mk-opt${t >= PICK - 250 ? ' hover' : ''}`} data-target="view">Can view</span>
                <span className="mk-opt sel">Can edit</span>
              </div>
            </div>
            <div className="mk-linknote" style={{ opacity: made ? 1 : 0.6 }}>
              {copied ? 'Link copied. Anyone with the link can view this report.' : `Anyone at ${CO} with the link`}
            </div>
          </div>
        </div>
        <div className="mk-toast" style={rise(t, COPY + 200, 420)}>
          <span className="mk-dot-ok" /> Link copied
        </div>
        <Pointer t={t} path={PATH} targets={targets} hideAfter={COPY + 900} />
      </div>
    </MockFrame>
  )
}
