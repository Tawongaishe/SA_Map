export const profileStyles = {
    sider: {
        borderRight: '1px solid #f0f0f0',
        height: 'calc(100vh - 64px)', // Assuming navbar is 64px
        position: 'sticky',
        top: '64px',  // Should match your navbar height
        left: 0,
        zIndex: 5,
        backgroundColor: '#fff'
    },
    siderContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '32px 0'
    },
    avatar: {
        border: '2px solid #1677ff',
        marginBottom: '16px',
        cursor: 'pointer'
    },
    content: {
        padding: '32px 40px',
        background: 'white',
        minHeight: 'calc(100vh - 64px)' // Match sider height
    },
    section: {
        marginBottom: '24px'
    },
    label: {
        fontSize: '16px',
        color: '#1f1f1f',
        marginBottom: '8px',
        fontWeight: 500
    },
    value: {
        fontSize: '16px',
        color: '#595959',
        marginBottom: '24px'
    },
    editButton: {
        color: '#595959',
        borderColor: '#d9d9d9',
        fontWeight: 'normal',
        boxShadow: 'none'
    }
};