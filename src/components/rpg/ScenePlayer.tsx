import { useState, useRef, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { scenes } from '../../data/scenes'
import { useAppStore } from '../../store/appStore'
import type { DialogueChoice, SceneNode } from '../../types'
import DialogueBubble from './DialogueBubble'
import ChoicePanel from './ChoicePanel'
import SceneResult from './SceneResult'

const XP_REWARDS: Record<number, number> = {
  1: 30,
  2: 50,
  3: 80,
}

interface HistoryEntry {
  speaker: 'npc' | 'player'
  text: string
  romaji?: string
}

export default function ScenePlayer() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const addXP = useAppStore((s) => s.addXP)
  const setRPGStars = useAppStore((s) => s.setRPGStars)

  const scene = scenes.find((s) => s.id === id)

  const [currentNodeId, setCurrentNodeId] = useState(scene?.startNodeId ?? '')
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [selectedChoice, setSelectedChoice] = useState<DialogueChoice | null>(null)
  const [ended, setEnded] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, selectedChoice])

  const currentNode: SceneNode | undefined = scene?.nodes[currentNodeId]

  const advanceTo = useCallback((nodeId: string) => {
    setSelectedChoice(null)
    setCurrentNodeId(nodeId)
  }, [])

  const handleContinue = useCallback(() => {
    if (!currentNode || !currentNode.next) return
    if (currentNode.npcText) {
      setHistory((prev) => [
        ...prev,
        { speaker: 'npc', text: currentNode.npcText!, romaji: currentNode.npcRomaji },
      ])
    }
    advanceTo(currentNode.next)
  }, [currentNode, advanceTo])

  const handleChoose = useCallback(
    (choice: DialogueChoice) => {
      setSelectedChoice(choice)

      // Add NPC bubble and player response to history after delay
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          ...(currentNode?.npcText
            ? [{ speaker: 'npc' as const, text: currentNode.npcText!, romaji: currentNode.npcRomaji }]
            : []),
          { speaker: 'player' as const, text: `${choice.text} — ${choice.jp}` },
        ])
        advanceTo(choice.nextNodeId)
      }, 1500)
    },
    [currentNode, advanceTo]
  )

  const handleEnd = useCallback(
    (stars: 1 | 2 | 3) => {
      if (!scene || ended) return
      setEnded(true)
      addXP(XP_REWARDS[stars])
      setRPGStars(scene.id, stars)
    },
    [scene, ended, addXP, setRPGStars]
  )

  const handleRestart = useCallback(() => {
    if (!scene) return
    setCurrentNodeId(scene.startNodeId)
    setHistory([])
    setSelectedChoice(null)
    setEnded(false)
  }, [scene])

  // Trigger end side effects
  useEffect(() => {
    if (currentNode?.type === 'end' && currentNode.endData && !ended) {
      handleEnd(currentNode.endData.stars)
    }
  }, [currentNode, ended, handleEnd])

  if (!scene || !currentNode) {
    return (
      <div className="p-4 text-center">
        <p className="text-[var(--text-2)]">Scene introuvable</p>
        <button
          onClick={() => navigate('/rpg')}
          className="btn-cta px-4 py-2 mt-4"
        >
          Retour
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)]">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="glass-sm w-9 h-9 flex items-center justify-center cursor-pointer text-[var(--text)]"
        >
          ←
        </button>
        <h2 className="font-bold text-[var(--text)] text-[16px]">
          {scene.icon} {scene.title}
        </h2>
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto flex flex-col gap-3 px-4 py-2"
      >
        {/* History bubbles */}
        {history.map((entry, i) => (
          <DialogueBubble
            key={i}
            text={entry.text}
            romaji={entry.romaji}
            speaker={entry.speaker}
          />
        ))}

        {/* Current node */}
        {currentNode.type === 'dialogue' && (
          <>
            {currentNode.npcText && (
              <DialogueBubble
                text={currentNode.npcText}
                romaji={currentNode.npcRomaji}
                speaker="npc"
              />
            )}
            <button
              onClick={handleContinue}
              className="btn-cta self-center px-6 py-2.5 mt-2 text-[14px]"
            >
              Continuer →
            </button>
          </>
        )}

        {currentNode.type === 'choice' && (
          <>
            {currentNode.npcText && (
              <DialogueBubble
                text={currentNode.npcText}
                romaji={currentNode.npcRomaji}
                speaker="npc"
              />
            )}
            {currentNode.choices && (
              <ChoicePanel
                choices={currentNode.choices}
                onChoose={handleChoose}
                selected={selectedChoice}
              />
            )}
          </>
        )}

        {currentNode.type === 'end' && currentNode.endData && (
          <>
            {currentNode.npcText && (
              <DialogueBubble
                text={currentNode.npcText}
                romaji={currentNode.npcRomaji}
                speaker="npc"
              />
            )}
            <SceneResult
              stars={currentNode.endData.stars}
              summary={currentNode.endData.summary}
              onRestart={handleRestart}
              onBack={() => navigate(-1)}
            />
          </>
        )}
      </div>
    </div>
  )
}
