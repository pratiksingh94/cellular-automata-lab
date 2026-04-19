const shortcuts = [
  { key: "Space", action: "Play / Pause" },
  { key: "N / →", action: "Step (next generation)"},
  { key: "C", action: "Clear grid" },
  { key: "R", action: "Random 20%" },
  { key: "H", action: "Random 50%" },
  { key: "+ / =", action: "Speed up" },
  { key: "-", action: "Slow down" },
  { key: "?", action: "Show shortcuts" },
  { key: "ESC", action: "Close modal / Pause" }
];

export default function ShortcutsModal({ onClose }: { onClose: () => void; }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-panel border border-border rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text">Keyboard Shortcuts</h2>
          <button onClick={onClose} className="text-text-muted hover:text-text transition-colors cursor-pointer">✕</button>
        </div>

        <table className="w-full">
          <tbody>
            {shortcuts.map(({key, action}) => (
              <tr key={key} className="border-b border-border last:border-0">
                <td className="py-2 pr-4">
                  <kbd className="px-2 py-1 bg-bg rounded text-accent text-sm">
                    {key}
                  </kbd>
                </td>

                <td className="py-2 text-text-muted text-sm">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-text-muted text-xs text-center">Press <kbd className="px-1 bg-bg rounded text-text-muted">?</kbd> to toggle this modal</p>
      </div>
    </div>
  )
}