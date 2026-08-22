'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useComments } from '@/hooks/useComments'
import {
  IconUser,
  IconMessageSquare,
  IconSend,
  IconHeart,
  IconUpload,
  IconPin,
  IconX,
} from '@/components/icons'

const ease = [0.22, 1, 0.36, 1] as const

export default function CommentsSection() {
  const {
    comments,
    isLoading,
    addComment,
    likeComment,
    pinComment,
    deleteComment,
    isAdmin,
  } = useComments()

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [hasPointer] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImage(file)
    const reader = new FileReader()
    reader.onloadend = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSubmitting(true)
    await addComment({ name: name.trim(), message: message.trim(), image })
    setName('')
    setMessage('')
    setImage(null)
    setPreview(null)
    setSubmitting(false)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
        <IconMessageSquare size={16} color="var(--accent)" />
        <h3
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          Guestbook · {comments?.length ?? 0} notes
        </h3>
      </div>

      {/* Comment form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: 24,
          borderRadius: 18,
          border: '1px solid var(--border)',
          background: 'var(--bg-card)',
          padding: '18px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          <FieldWrap onFocus onBlur>
            <IconUser size={13} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
          </FieldWrap>
        </div>

        <FieldWrap onFocus onBlur>
          <IconMessageSquare size={13} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Leave a note"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={inputStyle}
          />
        </FieldWrap>

        {/* Image upload */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <label
            htmlFor="comment-image"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              borderRadius: 999,
              border: '1px solid var(--border)',
              background: 'transparent',
              color: 'var(--text-muted)',
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!hasPointer) return
              e.currentTarget.style.borderColor = 'var(--border-hover)'
              e.currentTarget.style.color = 'var(--text-secondary)'
            }}
            onMouseLeave={(e) => {
              if (!hasPointer) return
              e.currentTarget.style.borderColor = 'var(--border)'
              e.currentTarget.style.color = 'var(--text-muted)'
            }}
          >
            <IconUpload size={12} />
            Attach image
          </label>
          <input
            id="comment-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          {preview && (
            <div style={{ position: 'relative', display: 'inline-flex' }}>
              <img src={preview} alt="preview" style={{ width: 32, height: 32, borderRadius: 8, objectFit: 'cover', border: '1px solid var(--border)' }} />
              <button
                type="button"
                onClick={() => { setImage(null); setPreview(null) }}
                style={{ position: 'absolute', top: -6, right: -6, width: 16, height: 16, borderRadius: '50%', border: 'none', background: 'var(--bg-card-solid)', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <IconX size={9} />
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              marginLeft: 'auto',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              borderRadius: 999,
              border: 'none',
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 11,
              fontFamily: "'DM Mono', monospace",
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.6 : 1,
              transition: 'opacity 0.2s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              if (!hasPointer || submitting) return
              e.currentTarget.style.opacity = '0.85'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={(e) => {
              if (!hasPointer) return
              e.currentTarget.style.opacity = '1'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <IconSend size={11} />
            {submitting ? 'Posting…' : 'Post'}
          </button>
        </div>
      </form>

      {/* Comments list */}
      {isLoading ? (
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>
          Loading notes…
        </div>
      ) : (
        <AnimatePresence>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {(comments ?? []).map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
                style={{
                  borderRadius: 14,
                  border: comment.is_pinned ? '1px solid var(--accent)' : '1px solid var(--border)',
                  background: comment.is_pinned ? 'var(--accent-glow)' : 'var(--bg-card)',
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 7,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {comment.image_url ? (
                    <img src={comment.image_url} alt={comment.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border)' }} />
                  ) : (
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-glow)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconUser size={13} color="var(--accent)" />
                    </div>
                  )}
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{comment.name}</span>
                  {comment.is_pinned && <IconPin size={12} color="var(--accent)" />}
                  <span style={{ marginLeft: 'auto', fontFamily: "'DM Mono', monospace", fontSize: 9, color: 'var(--text-muted)' }}>
                    {comment.created_at
                      ? new Date(comment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : ''}
                  </span>
                </div>

                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{comment.message}</p>

                {comment.attachment_url && (
                  <img src={comment.attachment_url} alt="attachment" style={{ maxWidth: 180, borderRadius: 10, border: '1px solid var(--border)' }} />
                )}

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 2 }}>
                  <button
                    onClick={() => likeComment(comment.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', color: comment.liked ? 'var(--accent)' : 'var(--text-muted)', fontSize: 11, fontFamily: "'DM Mono', monospace', padding: 0", transition: 'color 0.2s' }}
                  >
                    <IconHeart size={12} color={comment.liked ? 'var(--accent)' : 'var(--text-muted)'} />
                    {comment.likes ?? 0}
                  </button>

                  {isAdmin && (
                    <>
                      <button
                        onClick={() => pinComment(comment.id)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: 11, fontFamily: "'DM Mono', monospace", transition: 'color 0.2s' }}
                      >
                        <IconPin size={11} /> {comment.is_pinned ? 'Unpin' : 'Pin'}
                      </button>
                      <button
                        onClick={() => deleteComment(comment.id)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', cursor: 'pointer', color: '#FB7185', fontSize: 11, fontFamily: "'DM Mono', monospace", transition: 'opacity 0.2s', marginLeft: 'auto' }}
                      >
                        <IconX size={11} /> Delete
                      </button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  fontSize: 13,
  color: 'var(--text-primary)',
  fontFamily: "'Syne', sans-serif",
}

function FieldWrap({ children, onFocus, onBlur }: { children: React.ReactNode; onFocus?: boolean; onBlur?: boolean }) {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '9px 12px',
        background: 'var(--bg-card-solid)',
        transition: 'border-color 0.2s ease',
      }}
      onFocusCapture={onFocus ? (e) => { e.currentTarget.style.borderColor = 'var(--accent)' } : undefined}
      onBlurCapture={onBlur ? (e) => { e.currentTarget.style.borderColor = 'var(--border)' } : undefined}
    >
      {children}
    </div>
  )
}
