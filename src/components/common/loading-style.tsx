export default function Loadingstyle() {
    return (
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-600 border-t-secondary-200">
          {' '}
        </div>
        <p className="text-lg text-secondary-500"> Loading ... </p>
      </div>
    );
  }