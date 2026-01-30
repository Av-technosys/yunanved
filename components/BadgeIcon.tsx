const BadgeIcon = ({ color = "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300", children }: { color: string, children: React.ReactNode }) => {
    return <div className={` p-2 rounded-md ${color} w-fit h-fit flex items-center gap-2`}>
        {children}
    </div>
}

export default BadgeIcon