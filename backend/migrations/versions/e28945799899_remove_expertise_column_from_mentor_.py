"""Remove expertise column from Mentor table

Revision ID: e28945799899
Revises: 69481e39dba0
Create Date: 2024-10-29 20:27:27.745341

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e28945799899'
down_revision = '69481e39dba0'
branch_labels = None
depends_on = None


def upgrade():
    # Remove the 'expertise' column from mentor, if it exists
    with op.batch_alter_table('mentor') as batch_op:
        batch_op.drop_column('expertise')

def downgrade():
    # Re-add the 'expertise' column in case of rollback
    with op.batch_alter_table('mentor') as batch_op:
        batch_op.add_column(sa.Column('expertise', sa.String(100)))

    # ### end Alembic commands ###
